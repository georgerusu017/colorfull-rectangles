import { EditBox } from '../EditBox/EditBox';
import './Control.css';
import { InsertBox } from '../InsertBox/InsertBox';

export default function Editor(): JSX.Element {
  return (
    <div className="editorTab">
      <div className="boxes">
        <InsertBox />
        <EditBox />
      </div>
    </div>
  );
}
