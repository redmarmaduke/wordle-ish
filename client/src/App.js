import './App.css';

import Header from '../src/components/Header';
import Board from './components/Board';
import { WordleStateProvider } from './util/WordleStateProvider';
import Keyboard from './components/Keyboard';
import GuessButton from './components/GuessButton';

function App() {
  return (
    <div className="App">
      <WordleStateProvider>
        <Header/>
        <Board/>   
        <GuessButton/>   
        <Keyboard/>
      </WordleStateProvider>
    </div>
  );
}

export default App;
