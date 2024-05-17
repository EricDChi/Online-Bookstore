package com.bookstore.backendbookstore.service;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.utils.Msg;
import com.bookstore.backendbookstore.entity.Book;

public interface BookService {
    JSONObject getBooks();

    JSONObject getPagedBooks(Integer pageIndex, Integer pageSize);

    JSONObject searchBooks(String keyword, Integer pageIndex, Integer pageSize);

    Book findBookByID(long id);

    Msg addBook(Book book);

    Msg updateBook(Book book);
}
