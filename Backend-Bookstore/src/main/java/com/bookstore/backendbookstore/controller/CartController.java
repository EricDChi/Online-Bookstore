package com.bookstore.backendbookstore.controller;

import com.bookstore.backendbookstore.utils.BookItem;
import com.bookstore.backendbookstore.utils.Msg;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;
import com.bookstore.backendbookstore.service.CartService;
import com.bookstore.backendbookstore.entity.User;

import java.util.List;

@RestController
@EnableAutoConfiguration
public class CartController {

    @Autowired
    CartService cartService;

    @GetMapping("/api/cart")
    public List<BookItem> getCart(HttpSession session) {
        User user = (User) session.getAttribute("user");
        return cartService.getCartItems(user.getId());
    }

    @DeleteMapping("/api/cart/{id}")
    public Msg deleteCartItem(@PathVariable("id") Long id, HttpSession session) {
        User user = (User) session.getAttribute("user");
        return cartService.deleteCartItem(id, user.getId());
    }

    @PostMapping("/api/cart/{id}")
    public Msg changeCartItemNumber(@PathVariable("id") Long id, @RequestParam("number") Integer number, HttpSession session) {
        User user = (User) session.getAttribute("user");
        return cartService.changeCartItemNumber(id, user.getId(), number);
    }

    @PutMapping("/api/cart")
    public Msg addCartItem(@RequestParam("bookId") Long bookId, HttpSession session) {
        User user = (User) session.getAttribute("user");
        return cartService.addCartItem(bookId, user.getId());
    }
}
