package com.bookstore.backendbookstore.serviceimpl;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.dao.CartItemDao;
import com.bookstore.backendbookstore.service.BookService;
import com.bookstore.backendbookstore.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookstore.backendbookstore.dao.BookDao;
import com.bookstore.backendbookstore.entity.Book;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Autowired
    private CartItemDao cartItemDao;

    @Override
    public JSONObject getBooks() {
        List<Book> items = bookDao.findAll();
        int total = items.size() / 10;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("total", total);
        jsonObject.put("items", items);
        return jsonObject;
    }

    public JSONObject getPagedBooks(Integer pageIndex, Integer pageSize) {
        List<Book> items = bookDao.getPagedBooks(pageIndex, pageSize);
        int total = (bookDao.count() - 1) / pageSize + 1;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("total", total);
        jsonObject.put("items", items);
        return jsonObject;
    }

    public JSONObject searchBooks(String keyword, Integer pageIndex, Integer pageSize) {
        List<Book> allItems;
        List<Book> items = new ArrayList<>();
        allItems = bookDao.findByTitle(keyword);
        long max = Math.min((1 + pageIndex) * pageSize, allItems.size());
        for (int i = pageIndex * pageSize; i < max; i++) {
            items.add(allItems.get(i));
        }
        int total = allItems.size() / pageSize + 1;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("total", total);
        jsonObject.put("items", items);
        return jsonObject;
    }

    public Book findBookByID(long id) {
        return bookDao.findById(id);
    }

    public Msg addBook(JSONObject bookJson) {
        Book book = new Book();
        boolean isAdd = bookJson.getLong("id") == null;
        if (!isAdd) {
            book.setId(bookJson.getLong("id"));
        }
        Book bookByIsbn = bookDao.findByISBN(bookJson.getString("isbn"));
        if (bookByIsbn != null && (isAdd || !bookByIsbn.getId().equals(book.getId()))) {
            return new Msg(false, "ISBN已存在", null);
        }
        book.setTitle(bookJson.getString("title"));
        book.setAuthor(bookJson.getString("author"));
        book.setPrice(bookJson.getLong("price"));
        book.setStock(bookJson.getLong("stock"));
        book.setCover(bookJson.getString("cover"));
        book.setSales(0L);
        book.setPublisher(bookJson.getString("publisher"));
        book.setIsbn(bookJson.getString("isbn"));
        book.setBookDescription(bookJson.getString("bookDescription"));
        book.setAuthorDescription(bookJson.getString("authorDescription"));
        bookDao.save(book);
        return new Msg(true, "添加成功", null);
    }

    public Msg updateBook(Book book) {
        bookDao.save(book);
        return new Msg(true, "更新成功", null);
    }

    public Msg deleteBook(long id) {
        if (bookDao.existsById(id)) {
            cartItemDao.deleteByBookId(id);
            bookDao.deleteById(id);
            return new Msg(true, "删除成功", null);
        }
        return new Msg(false, "删除失败", null);
    }
}