import { useForm } from 'react-hook-form';
import '../InsertBox/InsertBox.css';
import { Square } from '../../Models/Square.model';
import { useCallback, useState } from 'react';
import store, { useAppSelector } from '../../store/store';
import { addSquare, squaresListCount } from '../../store/Features/squaresSlice';

export function InsertBox(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Square>();

  const invalidStyle = { border: 'red 0.5px solid' };
  const squaresCount = useAppSelector(squaresListCount);
  const [maxReached, setMaxReached] = useState(false);

  const addNewSquare = useCallback(
    (data) => {
      if (squaresCount < 9) {
        store.dispatch(
          addSquare({
            red: data.red,
            green: data.green,
            blue: data.blue,
          })
        );
      } else setMaxReached(true);
    },
    [squaresCount]
  );

  const addRandomSquare = useCallback(() => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    addNewSquare({ red, green, blue });
  }, [squaresCount]);

  return (
    <div className="insertBox">
      <h5>Box Inserter</h5>
      <div className="controls">
        <div className="rgb">
          <form className="forms" onSubmit={handleSubmit(addNewSquare)}>
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
        </div>

        <div className="buttonsAndError">
          <button
            className="button"
            type="submit"
            onClick={handleSubmit(addNewSquare)}
          >
            Insert
          </button>
          <button onClick={addRandomSquare} className="button">
            I. Random
          </button>

          {/* one at a time */}
          {(errors.green || errors.blue || errors.green) &&
            'Value must be between 0 and 255'}
        </div>
      </div>
      <p style={{ color: 'red' }}>
        {maxReached && 'Maximum number of squares reached'}
      </p>
    </div>
  );
}
