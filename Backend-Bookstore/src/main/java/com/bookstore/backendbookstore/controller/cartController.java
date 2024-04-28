package com.bookstore.backendbookstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;
import com.bookstore.backendbookstore.entity.cart;
import com.bookstore.backendbookstore.entity.cartItem;
import com.bookstore.backendbookstore.service.cartService;

@RestController
@EnableAutoConfiguration
public class cartController {

    @Autowired
    cartService cartService;
}
