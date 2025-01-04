package com.bookstore.backendbookstore.serviceimpl;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.dao.BookLabelDao;
import com.bookstore.backendbookstore.dao.CartItemDao;
import com.bookstore.backendbookstore.entity.Label;
import com.bookstore.backendbookstore.repository.LabelRepository;
import com.bookstore.backendbookstore.service.BookService;
import com.bookstore.backendbookstore.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookstore.backendbookstore.dao.BookDao;
import com.bookstore.backendbookstore.entity.Book;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class BookServiceImpl implements BookService {

    private final BookDao bookDao;

    private final CartItemDao cartItemDao;

    private final BookLabelDao bookLabelDao;

    private final LabelRepository labelRepository;

    @Autowired
    public BookServiceImpl(BookDao bookDao, CartItemDao cartItemDao, BookLabelDao bookLabelDao, LabelRepository labelRepository) {
        this.bookDao = bookDao;
        this.cartItemDao = cartItemDao;
        this.bookLabelDao = bookLabelDao;

//        labelRepository.deleteAll();
//        Label fiction = new Label("小说");
//        Label cnLiterature = new Label("中国文学");
//        Label jpLiterature = new Label("日本文学");
//        Label westernLiterature = new Label("西方文学");
//
//        Label martialArts = new Label("武侠");
//        Label modernLiterature = new Label("现代文学");
//
//        Label sports = new Label("体育");
//        Label football = new Label("田径");
//
//        Label detective = new Label("推理");
//        Label scienceFiction = new Label("科幻");
//
//        Label science = new Label("科学");
//        Label computerScience = new Label("计算机科学");
//        Label cpp = new Label("C++");
//        Label python = new Label("Python");
//
//        Label comic = new Label("漫画");
//        Label game = new Label("游戏");
//        Label music = new Label("音乐");
//
//        labelRepository.save(fiction);
//        labelRepository.save(cnLiterature);
//        labelRepository.save(jpLiterature);
//        labelRepository.save(westernLiterature);
//        labelRepository.save(martialArts);
//        labelRepository.save(modernLiterature);
//        labelRepository.save(sports);
//        labelRepository.save(football);
//        labelRepository.save(detective);
//        labelRepository.save(scienceFiction);
//        labelRepository.save(science);
//        labelRepository.save(computerScience);
//        labelRepository.save(cpp);
//        labelRepository.save(python);
//        labelRepository.save(comic);
//        labelRepository.save(game);
//        labelRepository.save(music);
//
//        fiction = labelRepository.findByName(fiction.getName());
//        fiction.addSubLabel(cnLiterature);
//        fiction.addSubLabel(jpLiterature);
//        fiction.addSubLabel(westernLiterature);
//        labelRepository.save(fiction);
//
//        cnLiterature = labelRepository.findByName(cnLiterature.getName());
//        cnLiterature.addSubLabel(martialArts);
//        cnLiterature.addSubLabel(modernLiterature);
//        labelRepository.save(cnLiterature);
//
//        jpLiterature = labelRepository.findByName(jpLiterature.getName());
//        jpLiterature.addSubLabel(sports);
//        labelRepository.save(jpLiterature);
//
//        sports = labelRepository.findByName(sports.getName());
//        sports.addSubLabel(football);
//        labelRepository.save(sports);
//
//        westernLiterature = labelRepository.findByName(westernLiterature.getName());
//        westernLiterature.addSubLabel(detective);
//        westernLiterature.addSubLabel(scienceFiction);
//        labelRepository.save(westernLiterature);
//
//        science = labelRepository.findByName(science.getName());
//        science.addSubLabel(computerScience);
//        labelRepository.save(science);
//
//        computerScience = labelRepository.findByName(computerScience.getName());
//        computerScience.addSubLabel(cpp);
//        computerScience.addSubLabel(python);
//        labelRepository.save(computerScience);

        this.labelRepository = labelRepository;
    }

    @Override
    public JSONObject getBooks() {
        List<Book> items = bookDao.findAll();
        int total = items.size() / 10;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("total", total);
        jsonObject.put("items", items);
        return jsonObject;
    }

    @Override
    public JSONObject getPagedBooks(Integer pageIndex, Integer pageSize) {
        List<Book> items = bookDao.getPagedBooks(pageIndex, pageSize);
        int total = (bookDao.count() - 1) / pageSize + 1;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("total", total);
        jsonObject.put("items", items);
        return jsonObject;
    }

    @Override
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

    @Override
    public Book findBookByID(long id) {
        return bookDao.findById(id);
    }

    @Override
    public JSONObject findBooksByLabel(String label) {
        System.out.println(label);
        List<String> labels = new ArrayList<>();
        labels.add(label);
        Label l = labelRepository.findByName(label);
        Set<Label> subLabelSet = l.getSubLabels();
        for (Label subLabel : subLabelSet) {
            labels.add(subLabel.getName());
        }
        List<Label> subLabelList = labelRepository.findSubLabelsofSublabels(label);
        for (Label subLabel : subLabelList) {
            labels.add(subLabel.getName());
        }
        for (String la : labels) {
            System.out.println(la);
        }
        List<Long> books = new ArrayList<>();
        books = bookLabelDao.findBookIdsByLabels(labels);
        List<Book> items = new ArrayList<>();
        for (Long bookId : books) {
            items.add(bookDao.findById(bookId));
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("total", 1);
        jsonObject.put("items", items);
        return jsonObject;
    }

    @Override
    public Msg addBook(JSONObject bookJson) {
        Book book = new Book();
        boolean isAdd = bookJson.getLong("id") == null;
        String msg = isAdd ? "添加成功" : "更新成功";
        if (!isAdd) {
            book.setId(bookJson.getLong("id"));
        }
        Book bookByIsbn = bookDao.findByISBN(bookJson.getString("isbn"));
        if (bookByIsbn != null && (isAdd || !bookByIsbn.getId().equals(book.getId()))) {
            return new Msg(false, "ISBN已存在", null);
        }
        book.setTitle(bookJson.getString("title"));
        book.setAuthor(bookJson.getString("author"));
        book.setPrice(bookJson.getInteger("price"));
        book.setStock(bookJson.getInteger("stock"));
        book.setCover(bookJson.getString("cover"));
        book.setSales(0);
        book.setPublisher(bookJson.getString("publisher"));
        book.setIsbn(bookJson.getString("isbn"));
        book.setBookDescription(bookJson.getString("bookDescription"));
        book.setAuthorDescription(bookJson.getString("authorDescription"));
        bookDao.save(book);
        return new Msg(true, msg, null);
    }

    @Override
    public Msg updateBook(Book book) {
        Book bookByIsbn = bookDao.findByISBN(book.getIsbn());
        if (bookByIsbn != null && !bookByIsbn.getId().equals(book.getId())) {
            return new Msg(false, "ISBN已存在", null);
        }
        if (book.getId() == null) {
            return new Msg(false, "更新失败", null);
        }
        bookDao.save(book);
        return new Msg(true, "更新成功", null);
    }

    @Override
    public Msg deleteBook(long id) {
        if (bookDao.existsById(id)) {
            cartItemDao.deleteByBookId(id);
            bookDao.deleteById(id);
            return new Msg(true, "删除成功", null);
        }
        return new Msg(false, "删除失败", null);
    }
}