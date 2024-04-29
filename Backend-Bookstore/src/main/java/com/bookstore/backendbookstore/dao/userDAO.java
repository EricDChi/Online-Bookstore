package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface userDAO extends JpaRepository<user, Long>{

}