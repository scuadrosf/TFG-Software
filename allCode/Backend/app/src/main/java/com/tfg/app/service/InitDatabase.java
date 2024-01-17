package com.tfg.app.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

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
        user.setRoles(List.of("USER", "ADMIN"));
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
        user2.setRoles(List.of("USER"));
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

        createUsers(10);

    }

    private void setProfileAvatarContent(User user, String profileAvatarUrl) throws IOException {
        Resource image = new ClassPathResource(profileAvatarUrl);
        user.setProfileAvatarFile(BlobProxy.generateProxy(image.getInputStream(), image.contentLength()));
    }

    public void createUsers(int numberOfUsers) {
        String avatarUrlAdmin = "/static/assets/predAdminAvatar.png";
        String avatarUrlUser = "/static/assets/predAvatar.png";

        for (int i = 1; i <= numberOfUsers; i++) {

            User user = new User();
            user.setName("User" + i);
            user.setLastName("LastName" + i);
            user.setUsername("Username" + i);
            user.setPhone("444444444");
            user.setEmail("user" + i + "@gmail.com");
            user.setPasswordEncoded(passwordEncoder.encode("pass" + i));
            user.setRoles(List.of("USER", "ADMIN"));
            user.setBirth(LocalDate.now().minusYears(20 + i));
            user.setGender(i % 2 == 0 ? "Masculino" : "Femenino");

            if (i % 2 == 0) {
                user.setAddress("Calle " + i);
                user.setCity("Ciudad " + i);
                user.setCountry("País " + i);
                user.setPostalCode("CodigoPostal" + i);
            }

            String avatarUrl = i % 2 == 0 ? avatarUrlUser : avatarUrlAdmin;
            try {
                setProfileAvatarContent(user, avatarUrl);
            } catch (IOException e) {
                e.printStackTrace();
            }

            users.save(user);
        }

        User user = new User();
        user.setName("User" + 11);
        user.setLastName("LastName" + 11);
        user.setUsername("Username" + 11);
        user.setPhone("444444444");
        user.setEmail("user" + 11 + "@gmail.com");
        user.setPasswordEncoded(passwordEncoder.encode("pass"));
        user.setRoles(List.of("DOCTOR"));
        user.setBirth(LocalDate.now().minusYears(20 + 11));
        user.setGender("Femenino");

        user.setAddress("Calle " + 11);
        user.setCity("Ciudad " + 11);
        user.setCountry("País " + 11);
        user.setPostalCode("CodigoPostal" + 11);

        String avatarUrl = avatarUrlAdmin;
        try {
            setProfileAvatarContent(user, avatarUrl);
        } catch (IOException e) {
            e.printStackTrace();
        }

        users.save(user);

    }
}