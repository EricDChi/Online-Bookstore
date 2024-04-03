import Home from './pages/Home';
import Login from './pages/Login';
import Book from './pages/Book';
import LoginPage from './page/login';
import HomePage from './page/home';
import BookPage from './page/book';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/book/1" element={<Book />}></Route>
          <Route path="/book/2" element={<BookPage />}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
