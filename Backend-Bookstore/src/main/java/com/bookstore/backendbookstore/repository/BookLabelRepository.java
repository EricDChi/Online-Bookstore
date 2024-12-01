package com.bookstore.backendbookstore.repository;

import com.bookstore.backendbookstore.entity.BookLabel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookLabelRepository extends JpaRepository<BookLabel, Long> {

    List<BookLabel> findByLabel(String label);
}
