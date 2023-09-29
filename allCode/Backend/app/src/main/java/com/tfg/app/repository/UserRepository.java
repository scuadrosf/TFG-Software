package com.tfg.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.app.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findBydni(String dni);
}
