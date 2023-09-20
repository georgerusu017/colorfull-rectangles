import { Square } from '../../Models/Square.model';
import './SelectedSquareInfo.css';

type SquareInfoProps = {
  onClose: () => void;
  square: Square;
};

const SquareInfoPopUp: React.FC<SquareInfoProps> = ({
  onClose,
  square: selectedSquare,
}) => {
  const date = selectedSquare.date;
  const squareDate: string[] = [];

  if (date) {
    // = [ ]
    squareDate.push(date.getDay().toString().padStart(2, '0'), '.');
    squareDate.push(date.getMonth().toString().padStart(2, '0'), '.');
    squareDate.push(date.getFullYear().toString().padStart(2, '0'), ' ');
    squareDate.push(date.getHours().toString().padStart(2, '0'), ':');
    squareDate.push(date.getMinutes().toString().padStart(2, '0'), ':');
    squareDate.push(date.getSeconds().toString().padStart(2, '0'));
  }

  return (
    <div className="squareInfo">
      <div>
        {
          <>
            <p>
              RGB:{selectedSquare.red},{selectedSquare.green},
              {selectedSquare.blue}
            </p>
            <p>Box number: {selectedSquare.number}</p>
            <p>Box id: {selectedSquare.id}</p>
            <p>Creation date: {squareDate}</p>
          </>
        }
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SquareInfoPopUp;
