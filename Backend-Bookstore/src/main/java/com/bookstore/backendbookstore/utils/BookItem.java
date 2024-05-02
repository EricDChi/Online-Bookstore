package com.bookstore.backendbookstore.utils;

import com.bookstore.backendbookstore.entity.Book;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BookItem {
    private Long id;
    private Integer number;
    private Book book;

    public BookItem(Long id, Integer number, Book book) {
        this.id = id;
        this.number = number;
        this.book = book;
    }
}
