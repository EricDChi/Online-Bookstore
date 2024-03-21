import Home from './pages/Home';
import Login from './pages/Login';
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
