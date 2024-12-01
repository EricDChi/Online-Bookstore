package com.bookstore.backendbookstore.entity;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "cover")
public class BookCover {

    @Id
    private Long id;

    private String cover;

    public BookCover() {
    }

    public BookCover(Long id, String cover) {
        this.id = id;
        this.cover = cover;
    }
}
