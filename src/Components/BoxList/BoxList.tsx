import { squaresListItems } from '../../store/Features/squaresSlice';
import { useAppSelector } from '../../store/store';
import './BoxList.css';
import ColoredBox from '../ColoredBox/ColoredBox';

export function BoxList(): JSX.Element {
  const squaresList = useAppSelector(squaresListItems);

  return (
    <div className="boxesContainer">
      {squaresList.map((square) => (
        <ColoredBox square={square} key={square.id} />
      ))}
    </div>
  );
}
