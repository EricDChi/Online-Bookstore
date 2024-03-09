import Home from './Home';
import Login from './Login';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Home" element={<Home />}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
