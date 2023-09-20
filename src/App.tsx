import './App.css';
import { BoxList } from './Components/BoxList/BoxList';

import Editor from './Components/ControlDiv/Control';

function App(): JSX.Element {
  return (
    <div className="App">
      <h1>Colorful Rectangles Editor</h1>
      <Editor />
      <div className="boxListTitle">
        <p>Box List </p>
      </div>
      <BoxList />
    </div>
  );
}

export default App;
