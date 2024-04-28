package com.bookstore.backendbookstore.service;

import com.bookstore.backendbookstore.entity.book;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class cartService {

    public static class cartResponse {
        private List<book> items;
    }
}
