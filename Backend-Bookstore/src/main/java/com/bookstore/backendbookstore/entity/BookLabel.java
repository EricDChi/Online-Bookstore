package com.bookstore.backendbookstore.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "book_label")
public class BookLabel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "book_id")
    private Long bookId;

    @Column(name = "label")
    private String label;

    public BookLabel() {
    }

    public BookLabel(Long bookId, String label) {
        this.bookId = bookId;
        this.label = label;
    }
}
