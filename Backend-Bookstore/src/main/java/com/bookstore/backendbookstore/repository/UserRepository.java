package com.bookstore.backendbookstore.repository;

import com.bookstore.backendbookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
