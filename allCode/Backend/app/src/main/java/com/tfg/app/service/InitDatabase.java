package com.tfg.app.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.hibernate.engine.jdbc.BlobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tfg.app.model.Description;
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
    @Autowired
    private DescriptionService descriptionService;

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
        user.setCodEntity(100L);
        String avatarUrlAdmin = "/static/assets/predAdminAvatar.png";
        try {
            setProfileAvatarContent(user, avatarUrlAdmin);
        } catch (IOException e) {
            e.printStackTrace();
        }
        users.save(user);

        Util util = new Util(0, 0, 0);
        utilService.save(util);

        User user3 = new User();

        user3.setName("Admin2");
        user3.setLastName("Doctor2");
        user3.setUsername("332W");
        user3.setPhone("444444444");
        user3.setEmail("admin2@gmail.com");
        user3.setCodEntity(200L);
        user3.setPasswordEncoded(passwordEncoder.encode("12345"));
        user3.setRoles(List.of("USER", "ADMIN"));
        user3.setBirth(LocalDate.now());
        user3.setGender("Masculino");
        avatarUrlAdmin = "/static/assets/predAdminAvatar.png";
        try {
            setProfileAvatarContent(user3, avatarUrlAdmin);
        } catch (IOException e) {
            e.printStackTrace();
        }
        users.save(user3);

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
        user2.setCodEntity(200L);
        String avatarUrlUser = "/static/assets/predAvatar.png";
        try {
            setProfileAvatarContent(user2, avatarUrlUser);
        } catch (IOException e) {
            e.printStackTrace();
        }

        users.save(user2);

        createUsers(10);
        createDescriptionsAndInterventionsType();

    }

    private LocalTime convertDurationToLocalTime(String duration) {
        try {
            // Extrae el número de la cadena
            int totalMinutes = Integer.parseInt(duration.replaceAll("[^0-9]", ""));
            // Convierte los minutos en horas y minutos
            int hours = totalMinutes / 60;
            int minutes = totalMinutes % 60;
            // Crea un LocalTime con esos valores
            return LocalTime.of(hours, minutes);
        } catch (NumberFormatException e) {
            // Manejo de error si la cadena no es un número válido
            return LocalTime.of(0, 0); // O manejar el error de otra manera
        }
    }

    private void createDescriptionsAndInterventionsType() {
        List<String> descriptionList = List.of("Mantenimiento y Prevención",
                "Problemas Comunes y Tratamientos de Rutina", "Ortodoncia y Estética Dental",
                "Procedimientos Quirúrgicos y Restauradores", "Problemas Específicos y Emergencias");

        List<Map<String, String>> interventionTypeList = List.of(
                Map.of(
                        "Chequeos y limpiezas regulares", "30",
                        "Consulta sobre hábitos orales", "15",
                        "Prevención de enfermedades dentales y educación sobre higiene oral", "15"),
                Map.of(
                        "Dolor de muelas", "5",
                        "Dolor de encías", "90",
                        "Obturación simple", "20",
                        "Obturacion compuesta", "30",
                        "Gran reconstrucción", "60",
                        "Problemas de encías", "45"),
                Map.of(
                        "Tratamientos de ortodoncia", "30",
                        "Blanqueamiento dental", "45",
                        "Mejoras estéticas", "90"),
                Map.of(
                        "Extracciones dentales", "60",
                        "Implantes y prótesis dentales", "60"),
                Map.of(
                        "Emergencias dentales", "45",
                        "Trastorno de la articulacion temporomandibular", "45",
                        "Revisión muelas de juicio", "15",
                        "Problemas de mordida o habla", "15"));

        for (int i = 0; i < descriptionList.size(); i++) {
            for (Map.Entry<String, String> entry : interventionTypeList.get(i).entrySet()) {
                Description description = new Description();
                description.setNameIntervention(entry.getKey());
                description.setNameDescription(descriptionList.get(i));
                LocalTime duration = convertDurationToLocalTime(entry.getValue());
                description.setTimeToIntervention(duration);
                descriptionService.save(description);
            }
        }
    }

    private void setProfileAvatarContent(User user, String profileAvatarUrl) throws IOException {
        Resource image = new ClassPathResource(profileAvatarUrl);
        user.setProfileAvatarFile(BlobProxy.generateProxy(image.getInputStream(), image.contentLength()));
    }

    public void createUsers(int numberOfUsers) {
        String avatarUrlAdmin = "/static/assets/predAdminAvatar.png";
        String avatarUrlUser = "/static/assets/predAvatar.png";

        for (int i = 0; i < numberOfUsers; i++) {

            User user = new User();
            user.setName("User" + i);
            user.setLastName("LastName" + i);
            user.setUsername("Username" + i);
            user.setPhone("444444444");
            user.setEmail("user" + i + "@gmail.com");
            user.setPasswordEncoded(passwordEncoder.encode("pass" + i));
            user.setRoles(i % 2 == 0 ? List.of("USER", "ADMIN", "DOCTOR") : List.of("USER"));
            user.setBirth(LocalDate.now().minusYears(20 + i));
            user.setGender(i % 2 == 0 ? "Masculino" : "Femenino");
            if (i <= 5)
                user.setCodEntity(100L);
            else
                user.setCodEntity(200L);

            if (i % 2 != 0) {
                user.setAddress("Calle " + i);
                user.setCity("Ciudad " + i);
                user.setCountry("País " + i);
                user.setPostalCode("CodigoPostal" + i);
            }

            String avatarUrl = i % 2 == 0 ? avatarUrlAdmin : avatarUrlUser;
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
        user.setCodEntity(200L);
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