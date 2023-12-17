package com.tfg.app.service;

import java.io.IOException;
import java.time.LocalDate;

import javax.annotation.PostConstruct;

import org.hibernate.engine.jdbc.BlobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tfg.app.model.User;
import com.tfg.app.model.Util;

@Service
public class InitDatabase {
    @Autowired
    private UserService users;
    @Autowired
    private UtilService utilService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {

        User user = new User();

        user.setName("Admin");
        user.setLastName("Doctor");
        user.setUsername("33W");
        user.setPhone("444444444");
        user.setEmail("admin@gmail.com");
        user.setPasswordEncoded(passwordEncoder.encode("12345"));
        user.setRoles("USER", "ADMIN");
        user.setBirth(LocalDate.now());
        user.setGender("Masculino");
        String avatarUrlAdmin = "/static/assets/predAdminAvatar.png";
        try {
            setProfileAvatarContent(user, avatarUrlAdmin);
        } catch (IOException e) {
            e.printStackTrace();
        }
        users.save(user);

        Util util = new Util(0,0,0);
        utilService.save(util);
    }

    private void setProfileAvatarContent(User user, String profileAvatarUrl) throws IOException {
        Resource image = new ClassPathResource(profileAvatarUrl);
        user.setProfileAvatarFile(BlobProxy.generateProxy(image.getInputStream(), image.contentLength()));
    }

}
