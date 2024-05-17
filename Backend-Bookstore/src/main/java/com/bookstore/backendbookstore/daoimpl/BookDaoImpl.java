package com.bookstore.backendbookstore.daoimpl;


import com.bookstore.backendbookstore.dao.BookDao;
import com.bookstore.backendbookstore.entity.Book;
import com.bookstore.backendbookstore.repository.BookRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepositoy;

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Book> findByTitle(String keyword) {
        return bookRepositoy.findByTitle(keyword);
    }

    public List<Book> findAll() {
        return bookRepositoy.findAll();
    }

    public List<Book> getPagedBooks(Integer pageIndex, Integer pageSize) {
        List<Book> items;
        items = entityManager.createQuery("SELECT e FROM Book e ORDER BY e.id ASC", Book.class)
                .setFirstResult(pageSize * pageIndex)
                .setMaxResults(pageSize)
                .getResultList();
        return items;
    }

    public Book findById(Long id) {
        return bookRepositoy.findById(id).orElse(null);
    }

    public int count() {
        return (int) bookRepositoy.count();
    }

    public Boolean existsById(Long id) {
        return bookRepositoy.existsById(id);
    }

    public void updateSalesAndStockById(Long id, Long number) {
        Book book = bookRepositoy.findById(id).orElse(null);
        assert book != null;
        book.setSales(book.getSales() + number);
        book.setStock(book.getStock() - number);
        bookRepositoy.save(book);
    }

    public void insertBook(Book book) {
        bookRepositoy.save(book);
    }
}
