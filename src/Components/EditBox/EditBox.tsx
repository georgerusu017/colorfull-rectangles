import { Control, useForm, useWatch } from 'react-hook-form';
import '../EditBox/EditBox.css';
import store, { useAppSelector } from '../../store/store';
import {
  updateSelectedSquare,
  selectedSquareBox,
} from '../../store/Features/squaresSlice';
import { useCallback, useEffect, useState } from 'react';
import SquareInfoPopUp from '../SelectedSquareInfo/SelectedSquareInfo';
import { start } from 'repl';

type FormValues = {
  red: string;
  green: string;
  blue: string;
};

function FormValuesWatched({
  control,
}: {
  control: Control<FormValues>;
}): JSX.Element {
  const red = useWatch({
    control,
    name: 'red',
    defaultValue: '255',
  });
  const green = useWatch({
    control,
    name: 'green',
    defaultValue: '80',
  });
  const blue = useWatch({
    control,
    name: 'blue',
    defaultValue: '127',
  });

  return (
    <div
      className="square"
      style={{
        background: `rgb(${red},${green},${blue})`,
      }}
    ></div>
  );
}

export function EditBox(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const selectedSquare = useAppSelector(selectedSquareBox);
  const invalidStyle = { border: 'red 0.5px solid' };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const handleIClick = useCallback(() => {
    if (selectedSquare) setShowModal(true);
  }, [selectedSquare]);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onSubmit = (data: FormValues) => {
    store.dispatch(updateSelectedSquare(data));
  };

  {
    useEffect(() => {
      reset({
        red: selectedSquare?.red,
        green: selectedSquare?.green,
        blue: selectedSquare?.blue,
      });
    }, [selectedSquare]);
  }

  return (
    <div className="editBox" id="editBox">
      <h5>Box Editor</h5>

      <button className="infoButton" onClick={handleIClick}>
        i
      </button>
      {showModal && selectedSquare && (
        <SquareInfoPopUp onClose={onCloseModal} square={selectedSquare} />
      )}

      <div className="controls">
        <div className="rgb">
          <form className="forms">
            <label>Red:</label>
            <input
              style={errors.red ? invalidStyle : {}}
              {...register('red', {
                required: true,
                max: 255,
                min: 0,
              })}
              type="number"
              placeholder="R"
            />
            <label>Green:</label>
            <input
              style={errors.green ? invalidStyle : {}}
              {...register('green', {
                required: true,
                max: 255,
                min: 0,
              })}
              type="number"
              placeholder="G"
            />
            <label>Blue:</label>
            <input
              style={errors.blue ? invalidStyle : {}}
              {...register('blue', {
                required: true,
                max: 255,
                min: 0,
              })}
              type="number"
              placeholder="B"
            />
          </form>
          <div style={{ textAlign: 'start' }}>
            <label>
              Box: {selectedSquare ? selectedSquare.number : 'None'}
            </label>
          </div>
        </div>

        <div className="squarePreview">
          <FormValuesWatched control={control} />
          <button
            className="button"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Apply Color
          </button>
        </div>
      </div>
    </div>
  );
}
