package com.bookstore.backendbookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookstore.backendbookstore.dao.BookDAO;
import com.bookstore.backendbookstore.entity.Book;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    public static class BookResponse {
        private int total;
        private List<Book> items;

        public BookResponse(int total, List<Book> items) {
            this.total = total;
            this.items = items;
        }
        public int getTotal() {
            return total;
        }
        public void setTotal(int total) {
            this.total = total;
        }
        public List<Book> getItems() {
            return this.items;
        }
        public void setItems(List<Book> items) {
            this.items = items;
        }
    }

    @Autowired
    BookDAO bookDAO;

    public List<Book> getAllBooks() {
        return bookDAO.findAll();
    }

    public BookResponse getPagedBooks(Integer pageIndex, Integer pageSize) {
        List<Book> items = new ArrayList<Book>();
        long max = (1 + pageIndex) * pageSize < bookDAO.count() ? (1 + pageIndex) * pageSize : bookDAO.count();
        for (long i = 1 + pageIndex * pageSize; i <= max; i++) {
            items.add(bookDAO.findById(i).orElse(null));
        }
        int total = items.size() / pageSize + 1;
        BookResponse bookResponse = new BookResponse(total, items);
        return bookResponse;
    }

    public BookResponse searchBooks(String keyword, Integer pageIndex, Integer pageSize) {
        List<Book> allItems = new ArrayList<Book>();
        List<Book> items = new ArrayList<Book>();
        allItems = bookDAO.findByTitle(keyword);
        long max = (1 + pageIndex) * pageSize < allItems.size() ? (1 + pageIndex) * pageSize : allItems.size();
        for (int i = pageIndex * pageSize; i < max; i++) {
            items.add(allItems.get(i));
        }
        int total = allItems.size() / pageSize + 1;
        BookResponse bookResponse = new BookResponse(total, items);
        return bookResponse;
    }

    public Book findBookByID(long id) {
        return bookDAO.findById(id).orElse(null);
    }
}
