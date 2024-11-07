package com.bookstore.backendbookstore.daoimpl;

import com.alibaba.fastjson2.JSON;
import com.bookstore.backendbookstore.dao.BookDao;
import com.bookstore.backendbookstore.entity.Book;
import com.bookstore.backendbookstore.repository.BookRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.List;

@Repository
@Transactional
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepositoy;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private RedisTemplate redisTemplate;

    @Override
    public List<Book> findByTitle(String keyword) {
        return bookRepositoy.findByTitle(keyword);
    }

    @Override
    public List<Book> findAll() {
        return bookRepositoy.findAll();
    }

    @Override
    public List<Book> getPagedBooks(Integer pageIndex, Integer pageSize) {
        List<Book> items;
        items = entityManager.createQuery("SELECT e FROM Book e ORDER BY e.id ASC", Book.class)
                .setFirstResult(pageSize * pageIndex)
                .setMaxResults(pageSize)
                .getResultList();
        return items;
    }

    @Override
    public Book findById(Long id) {
        Book book = null;
        try {
            System.out.println("Searching Book: " + id + " in Redis");

            String p = (String) redisTemplate.opsForValue().get("book" + id);

            if (p == null) {
                System.out.println("Book: " + id + " is not in Redis");
                System.out.println("Searching Book: " + id + " in DB");
                book = bookRepositoy.findById(id).orElse(null);
                redisTemplate.opsForValue().set("book" + id, JSON.toJSONString(book));
            } else {
                book = JSON.parseObject(p, Book.class);
                System.out.println("Book: " + id + " is in Redis");
            }
        }
        catch (Exception e) {
            System.err.println("Redis is unavailable. Fallback to database.");
            book = bookRepositoy.findById(id).orElse(null);
        }
        return book;
    }

    @Override
    public Book findByISBN(String ISBN) {
        return bookRepositoy.findByIsbn(ISBN);
    }

    @Override
    public int count() {
        return (int) bookRepositoy.count();
    }

    @Override
    public Boolean existsById(Long id) {
        Boolean exists = false;
        try {
            String p = (String) redisTemplate.opsForValue().get("book" + id);

            if (p == null) {
                Book book = bookRepositoy.findById(id).orElse(null);
                if (book == null) {
                    exists = false;
                }
                else {
                    exists = true;
                    redisTemplate.opsForValue().set("book" + id, JSON.toJSONString(book));
                }
            }
            else {
                exists = true;
            }
        }
        catch (Exception e) {
            System.err.println("Redis is unavailable. Fallback to database.");
            exists = bookRepositoy.existsById(id);
        }

        return exists;
    }

    @Override
    public void updateSalesAndStockById(Long id, Integer number) {
        Book book = findById(id);
        assert book != null;
        book.setSales(book.getSales() + number);
        book.setStock(book.getStock() - number);
        save(book);
    }

    @Override
    public void save(Book book) {
        bookRepositoy.save(book);
        try {
            redisTemplate.opsForValue().set("book" + book.getId(), JSON.toJSONString(book));
        }
        catch (Exception e) {
            System.err.println("Redis is unavailable. Fallback to database.");
        }
    }

    @Override
    public void deleteById(Long id) {
        String p = null;
        try {
            p = (String) redisTemplate.opsForValue().get("book" + id);
            if (p != null) {
                redisTemplate.delete("book" + id);
            }
        }
        catch (Exception e) {
            System.err.println("Redis is unavailable. Fallback to database.");
        }

        bookRepositoy.deleteById(id);
    }
}
