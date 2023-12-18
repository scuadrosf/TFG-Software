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

        Util util = new Util(0, 0, 0);
        utilService.save(util);

        User user2 = new User();

        user2.setName("Sergio");
        user2.setLastName("Cuadros Flores");
        user2.setUsername("54362066W");
        user2.setPhone("444444444");
        user2.setEmail("sercua.flores@gmail.com");
        user2.setPasswordEncoded(passwordEncoder.encode("pass"));
        user2.setRoles("USER");
        user2.setBirth(LocalDate.of(2002, 12, 24));
        user2.setGender("Masculino");
        user2.setAddress("Calle Benito Perez");
        user2.setCity("Madrid");
        user2.setCountry("España");
        user2.setPostalCode("28220");
        String avatarUrlUser = "/static/assets/predAvatar.png";
        try {
            setProfileAvatarContent(user2, avatarUrlUser);
        } catch (IOException e) {
            e.printStackTrace();
        }

        users.save(user2);
    }

    private void setProfileAvatarContent(User user, String profileAvatarUrl) throws IOException {
        Resource image = new ClassPathResource(profileAvatarUrl);
        user.setProfileAvatarFile(BlobProxy.generateProxy(image.getInputStream(), image.contentLength()));
    }

}
