import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from '../page/login';
import HomePage from '../page/home';
import BookPage from '../page/book';
import CartPage from '../page/cart';
import UserPage from '../page/user';
import SearchPage from "../page/search";
import OrderPage from "../page/order";
import ManageUserPage from "../page/manageUser";
import ManageBookPage from "../page/manageBook";
import BookStatisticsPage from "../page/bookStatistics";
import RankBookPage from "../page/rankBook";
import RankUserPage from "../page/rankUser";

function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/book/:id" element={<BookPage />}></Route>
            <Route path="/search/:keyword" element={<SearchPage />}></Route>
            <Route path='/cart' element={<CartPage />}></Route>
            <Route path='/myhome' element={<UserPage />}></Route>
            <Route path='/order' element={<OrderPage />}></Route>
            <Route path='/manage/user' element={<ManageUserPage />}></Route>
            <Route path='/manage/book' element={<ManageBookPage />}></Route>
            <Route path='/statistics' element={<BookStatisticsPage />}></Route>
            <Route path='/rank/book' element={<RankBookPage />}></Route>
            <Route path='/rank/user' element={<RankUserPage />}></Route>
        </Routes>
    </BrowserRouter>
}

export default AppRouter;
