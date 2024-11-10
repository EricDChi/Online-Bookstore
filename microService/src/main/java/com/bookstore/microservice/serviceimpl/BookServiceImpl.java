package com.bookstore.microservice.serviceimpl;

import com.bookstore.microservice.dao.BookDao;
import com.bookstore.microservice.entity.Book;
import com.bookstore.microservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {

    private final BookDao bookDao;

    @Autowired
    public BookServiceImpl(BookDao bookDao) {
        this.bookDao = bookDao;
    }

    @Override
    public String getAuthorByTitle(String title) {
        Book book = bookDao.findByTitle(title);
        if (book == null) {
            return "Book not found";
        }
        return book.getAuthor();
    }
}
