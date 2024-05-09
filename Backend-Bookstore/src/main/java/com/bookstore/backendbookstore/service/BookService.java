package com.bookstore.backendbookstore.service;

import com.bookstore.backendbookstore.utils.Msg;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookstore.backendbookstore.dao.BookDAO;
import com.bookstore.backendbookstore.entity.Book;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    @Getter
    @Setter
    public static class BookResponse {
        private int total;
        private List<Book> items;

        public BookResponse(int total, List<Book> items) {
            this.total = total;
            this.items = items;
        }
    }

    @Autowired
    BookDAO bookDAO;

    public List<Book> getAllBooks() {
        return bookDAO.findAll();
    }

    public BookResponse getPagedBooks(Integer pageIndex, Integer pageSize) {
        List<Book> items = new ArrayList<>();
        long max = Math.min((long) (1 + pageIndex) * pageSize, bookDAO.count());

        for (long i = 1 + (long) pageIndex * pageSize; i <= max; i++) {
            items.add(bookDAO.findById(i).orElse(null));
        }
        int total = (int) bookDAO.count() / pageSize + 1;
        return new BookResponse(total, items);
    }

    public BookResponse searchBooks(String keyword, Integer pageIndex, Integer pageSize) {
        List<Book> allItems;
        List<Book> items = new ArrayList<>();
        allItems = bookDAO.findByTitle(keyword);
        long max = Math.min((1 + pageIndex) * pageSize, allItems.size());
        for (int i = pageIndex * pageSize; i < max; i++) {
            items.add(allItems.get(i));
        }
        int total = allItems.size() / pageSize + 1;
        return new BookResponse(total, items);
    }

    public Book findBookByID(long id) {
        return bookDAO.findById(id).orElse(null);
    }

    public Msg addBook(Book book) {
        bookDAO.save(book);
        return new Msg(true, "添加成功", null);
    }

    public Msg updateBook(Book book) {
        bookDAO.save(book);
        return new Msg(true, "更新成功", null);
    }
}