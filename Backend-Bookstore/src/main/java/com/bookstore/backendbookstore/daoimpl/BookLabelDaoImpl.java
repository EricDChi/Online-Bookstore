package com.bookstore.backendbookstore.daoimpl;

import com.bookstore.backendbookstore.dao.BookLabelDao;
import com.bookstore.backendbookstore.entity.BookLabel;
import com.bookstore.backendbookstore.repository.BookLabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class BookLabelDaoImpl implements BookLabelDao {

    @Autowired
    private BookLabelRepository bookLabelRepository;

    @Override
    public List<Long> findBookIdsByLabels(List<String> labels) {
        List<Long> result = new ArrayList<>();
        for (String label : labels) {
            List<BookLabel> bookLabels = bookLabelRepository.findByLabel(label);
            for (BookLabel bookLabel : bookLabels) {
                if (!result.contains(bookLabel.getBookId())) {
                    result.add(bookLabel.getBookId());
                }
            }
        }
        return result;
    }
}
