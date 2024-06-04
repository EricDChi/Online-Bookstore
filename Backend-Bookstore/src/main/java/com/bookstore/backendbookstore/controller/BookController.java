package com.bookstore.backendbookstore.controller;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.service.BookService;
import com.bookstore.backendbookstore.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;
import com.bookstore.backendbookstore.entity.Book;

@RestController
@EnableAutoConfiguration
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/api/book")
    public JSONObject getBooks() {
        return bookService.getBooks();
    }

    @GetMapping("/api/book/{id}")
    public Book getBookByID(@PathVariable("id") Long id) {
        if (id > 0) {
            return bookService.findBookByID(id);
        }
        return null;
    }

    @GetMapping("api/search")
    public JSONObject getSearchBooks(@RequestParam("keyword") String keyword,
                                     @RequestParam("pageIndex") Integer pageIndex,
                                     @RequestParam("pageSize") Integer pageSize) {
        return bookService.searchBooks(keyword, pageIndex, pageSize);
    }

    @GetMapping("api/books")
    public JSONObject getSearchedBooks(@RequestParam("pageIndex") Integer pageIndex,
                                       @RequestParam("pageSize") Integer pageSize) {
        return bookService.getPagedBooks(pageIndex, pageSize);
    }

    @DeleteMapping("/api/book/{id}")
    public Msg deleteBookByID(@PathVariable("id") Long id) {
        if (id > 0) {
            return bookService.deleteBook(id);
        }
        return null;
    }

    @PutMapping("/api/book/add")
    public Msg addBook(@RequestBody JSONObject book) {
        return bookService.addBook(book);
    }

    @PutMapping("/api/book/update")
    public Msg updateBook(@RequestBody Book book) {
        return bookService.updateBook(book);
    }
}
