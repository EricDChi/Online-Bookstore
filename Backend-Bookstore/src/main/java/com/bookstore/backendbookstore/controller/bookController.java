package com.bookstore.backendbookstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;
import com.bookstore.backendbookstore.entity.book;
import com.bookstore.backendbookstore.service.bookService;

import java.util.List;

@RestController
@EnableAutoConfiguration
public class bookController {

    public class BookRequest {
        private String keyword;
        private Integer pageIndex;
        private Integer pageSize;

        public String getKeyword() {
            return this.keyword;
        }
        public void setTotal(String keyword) {
            this.keyword = keyword;
        }
        public Integer getPageIndex() {
            return this.pageIndex;
        }
        public void setPageIndex(Integer pageIndex) {
            this.pageIndex = pageIndex;
        }
        public Integer getPageSize() {
            return this.pageSize;
        }
        public void setPageSize(Integer pageSize) {
            this.pageIndex = pageSize;
        }
    }

    @Autowired
    bookService bookService;

    @GetMapping("/api/book")
    public bookService.BookResponse getBooks() {
        List<book> items = bookService.getAllBooks();
        int total = items.size() / 10;
        bookService.BookResponse bookResponse = new bookService.BookResponse(total, items);
        return bookResponse;
    }

    @GetMapping("/api/book/{id}")
    public book getBookByID(@PathVariable("id") Long id) {
        if (id > 0) {
            return bookService.findBookByID(id);
        }
        return null;
    }

    @GetMapping("api/search")
    public bookService.BookResponse getSearchBooks(@RequestParam("keyword") String keyword,
                                                   @RequestParam("pageIndex") Integer pageIndex,
                                                   @RequestParam("pageSize") Integer pageSize) {
        return bookService.searchBooks(keyword, pageIndex, pageSize);
    }

    @GetMapping("api/books")
    public bookService.BookResponse getSearchedBooks(@RequestParam("pageIndex") Integer pageIndex,
                                                     @RequestParam("pageSize") Integer pageSize) {
        return bookService.getPagedBooks(pageIndex, pageSize);
    }
}
