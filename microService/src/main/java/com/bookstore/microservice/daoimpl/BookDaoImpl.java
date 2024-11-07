package com.bookstore.microservice.daoimpl;

import com.bookstore.microservice.entity.Book;
import com.bookstore.microservice.dao.BookDao;
import com.bookstore.microservice.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book findByTitle(String title) {
        return bookRepository.findByTitle(title);
    }
}
