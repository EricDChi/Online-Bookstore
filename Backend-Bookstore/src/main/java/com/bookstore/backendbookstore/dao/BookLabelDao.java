package com.bookstore.backendbookstore.dao;

import java.util.List;

public interface BookLabelDao {

    List<Long> findBookIdsByLabels(List<String> labels);
}
