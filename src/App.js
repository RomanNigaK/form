import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router';
import Layout from './JSX/Layout/Layout';
import Example from './JSX/Example/Example';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Example/>}/>
        </Route>
      </Routes>
     
    </div>
  );
}

export default App;
