import LoginPage from './page/login';
import HomePage from './page/home';
import BookPage from './page/book';
import CartPage from './page/cart';
import { Route, Routes } from "react-router-dom"
import UserPage from './page/user';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/book/:id" element={<BookPage />}></Route>
          <Route path='/cart' element={<CartPage />}></Route>
          <Route path='/myhome' element={<UserPage />}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
