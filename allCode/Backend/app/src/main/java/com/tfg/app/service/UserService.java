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
        users.save(this.users.save(user));
    }

    public List<User> findAll() {
        return users.findAll();
    }

    public Optional<User> findById(Long id) {
        return users.findById(id);
    }

}
