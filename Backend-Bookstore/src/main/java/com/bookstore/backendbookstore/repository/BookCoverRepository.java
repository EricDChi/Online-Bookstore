package com.bookstore.backendbookstore.repository;

import com.bookstore.backendbookstore.entity.BookCover;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookCoverRepository extends MongoRepository<BookCover, Long> {
}
