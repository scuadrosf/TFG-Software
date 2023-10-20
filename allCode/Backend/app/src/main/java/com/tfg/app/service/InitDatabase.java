package com.tfg.app.service;

import java.io.IOException;

import javax.annotation.PostConstruct;

import org.hibernate.engine.jdbc.BlobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
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

        user.setName("Admin");
        user.setUsername("33W");
        user.setEmail("admin@gmail.com");
        user.setPasswordEncoded(passwordEncoder.encode("12345"));
        user.setRoles("USER", "ADMIN");
        String avatarUrlAdmin = "/static/assets/predAdminAvatar.png";
        try {
            setProfileAvatarContent(user, avatarUrlAdmin);
        } catch (IOException e) {
            e.printStackTrace();
        }
        users.save(user);
    }

    private void setProfileAvatarContent(User user, String profileAvatarUrl) throws IOException {
        Resource image = new ClassPathResource(profileAvatarUrl);
        user.setProfileAvatarFile(BlobProxy.generateProxy(image.getInputStream(), image.contentLength()));
    }

}
