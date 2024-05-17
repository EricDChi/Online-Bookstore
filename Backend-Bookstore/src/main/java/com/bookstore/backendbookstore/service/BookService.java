package com.bookstore.backendbookstore.service;

import com.alibaba.fastjson.JSONObject;
import com.bookstore.backendbookstore.entity.Book;
import com.bookstore.backendbookstore.utils.Msg;

public interface BookService {
    JSONObject getBooks();

    JSONObject getPagedBooks(Integer pageIndex, Integer pageSize);

    JSONObject searchBooks(String keyword, Integer pageIndex, Integer pageSize);

    Book findBookByID(long id);

    Msg addBook(Book book);

    Msg updateBook(Book book);
}
