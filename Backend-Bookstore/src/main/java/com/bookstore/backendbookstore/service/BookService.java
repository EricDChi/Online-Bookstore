package com.bookstore.backendbookstore.service;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.utils.Msg;
import com.bookstore.backendbookstore.entity.Book;

import java.util.List;

public interface BookService {
    JSONObject getBooks();

    JSONObject getPagedBooks(Integer pageIndex, Integer pageSize);

    JSONObject searchBooks(String keyword, Integer pageIndex, Integer pageSize);

    Book findBookByID(long id);

    JSONObject findBooksByLabel(String label);

    Msg addBook(JSONObject jsonObject);

    Msg updateBook(Book book);

    Msg deleteBook(long id);
}
