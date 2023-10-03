package com.tfg.app.service;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tfg.app.model.User;

@Service
public class InitDatabase {
    @Autowired
    private UserService users;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        
        User user = new User();

        user.setName("admin");
        user.setUsername("33W");
        user.setEmail("admin@gmail.com");
        user.setPasswordEncoded(passwordEncoder.encode("12345"));
        user.setRoles("USER","ADMIN");
        users.save(user);
    }
}
