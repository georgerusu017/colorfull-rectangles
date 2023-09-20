import { useCallback, useEffect, useMemo } from 'react';
import { Square } from '../../Models/Square.model';
import store, { useAppSelector } from '../../store/store';
import {
  selectedSquareBox,
  setSelectedSquare,
} from '../../store/Features/squaresSlice';
type BoxProps = {
  square: Square;
};

export default function ColoredBox({ square }: BoxProps): JSX.Element {
  const boxClassName = 'listedBox shadow ';
  const selectedBoxStyle = 'selectedBox ';
  const selectedSquare = useAppSelector(selectedSquareBox);

  const onBoxClick = useCallback(() => {
    store.dispatch(setSelectedSquare(square));
  }, [square]);

  const backgroundStyle = useMemo(() => {
    return `rgb(${square.red},${square.green},${square.blue})`;
  }, [square]);

  return (
    <div
      onClick={onBoxClick}
      style={{
        background: backgroundStyle,
      }}
      className={
        square.id == selectedSquare?.id
          ? boxClassName + selectedBoxStyle
          : boxClassName
      }
    ></div>
  );
}
