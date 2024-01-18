package com.tfg.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.app.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
    List<User> findByNameContaining(String name);
    Optional<User> findByUsername(String dni);
    Optional<User> findByEmail(String email);
    Optional<User> findByName(String name);
    List<User> findByNameContainingOrLastNameContainingOrUsernameContaining(String name, String lastName, String username);
    List<User> findAllUsersByDoctorAsignatedId(Long id);
}
