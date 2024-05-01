package com.bookstore.backendbookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookstore.backendbookstore.dao.bookDAO;
import com.bookstore.backendbookstore.entity.book;

import java.util.ArrayList;
import java.util.List;

@Service
public class bookService {

    public static class BookResponse {
        private int total;
        private List<book> items;

        public BookResponse(int total, List<book> items) {
            this.total = total;
            this.items = items;
        }
        public int getTotal() {
            return total;
        }
        public void setTotal(int total) {
            this.total = total;
        }
        public List<book> getItems() {
            return this.items;
        }
        public void setItems(List<book> items) {
            this.items = items;
        }
    }

    @Autowired
    bookDAO bookDAO;

    public List<book> getAllBooks() {
        return bookDAO.findAll();
    }

    public BookResponse getPagedBooks(Integer pageIndex, Integer pageSize) {
        List<book> items = new ArrayList<book>();
        long max = (1 + pageIndex) * pageSize < bookDAO.count() ? (1 + pageIndex) * pageSize : bookDAO.count();
        for (long i = 1 + pageIndex * pageSize; i <= max; i++) {
            items.add(bookDAO.findById(i).orElse(null));
        }
        int total = (int) bookDAO.count() / pageSize + 1;
        BookResponse bookResponse = new BookResponse(total, items);
        return bookResponse;
    }

    public BookResponse searchBooks(String keyword, Integer pageIndex, Integer pageSize) {
        List<book> allItems = new ArrayList<book>();
        List<book> items = new ArrayList<book>();
        allItems = bookDAO.findByTitle(keyword);
        long max = (1 + pageIndex) * pageSize < allItems.size() ? (1 + pageIndex) * pageSize : allItems.size();
        for (int i = pageIndex * pageSize; i < max; i++) {
            items.add(allItems.get(i));
        }
        int total = allItems.size() / pageSize + 1;
        BookResponse bookResponse = new BookResponse(total, items);
        return bookResponse;
    }

    public book findBookByID(long id) {
        return bookDAO.findById(id).orElse(null);
    }
}
