package com.tfg.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.app.model.User;
import com.tfg.app.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository users;

    public void delete(Long id) {
        users.deleteById(id);
    }

    public void save(User user) {
        this.users.save(user);
    }

    public List<User> findAll() {
        return users.findAll();
    }

    public Optional<User> findById(Long id) {
        return users.findById(id);
    }

    public Optional<User> findByUsername(String dni){
        return users.findByUsername(dni);
    }

    public boolean existUsername(String dni) {
        Optional<User> user = findByUsername(dni);
        return user.isPresent();
    }
    public Optional<User> findByEmail(String email){
        return users.findByEmail(email);
    }
    public Optional<User> findByName(String name){
        return users.findByName(name);
    }



}
