package com.tfg.app.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.sql.Blob;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.sql.rowset.serial.SerialBlob;

import org.hibernate.engine.jdbc.BlobProxy;
import org.json.JSONArray;
import org.json.JSONObject;
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
        createSuperAdmin(new User());
        createEntities();
        createDoctors();
        createUsers();
        // createAppointmentToUser();
        createDescriptionsAndInterventionsType();
    }

    private void createUsers() {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(
                        "https://randomuser.me/api/?results=10&inc=gender,name,location,email,dob,phone,cell,id,picture,nat"))
                .header("accept", "application/json")
                .build();

        try {
            HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
            JSONObject obj = new JSONObject(response.body());

            JSONArray array = obj.getJSONArray("results");

            for (int i = 0; i < array.length(); i++) {
                JSONObject person = array.getJSONObject(i);
                JSONObject nameObject = person.getJSONObject("name");
                JSONObject locationObject = person.getJSONObject("location");
                JSONObject dobObject = person.getJSONObject("dob");

                User user = new User();
                user.setName(nameObject.getString("first"));
                user.setLastName(nameObject.getString("last"));
                user.setUsername(person.getJSONObject("id").optString("value", person.getString("phone")));
                LocalDate birthDate = LocalDate.parse(dobObject.getString("date").substring(0, 10));
                user.setBirth(birthDate);
                user.setCodEntity(i % 2 == 0 ? 100L : 200L);
                user.setPhone(person.getString("phone"));
                user.setEmail(person.getString("email"));
                user.setCity(locationObject.getString("city"));
                user.setAddress(locationObject.getJSONObject("street").getInt("number") + " "
                        + locationObject.getJSONObject("street").getString("name"));
                String postalCode = String.valueOf(locationObject.optInt("postcode", 28820));
                user.setPostalCode(postalCode);
                user.setGender("male".equals(person.getString("gender")) ? "Masculino" : "Femenino");
                user.setCountry(locationObject.getString("country"));
                user.setProfileAvatarFile(downloadImage(person.getJSONObject("picture").getString("large")));
                user.setPasswordEncoded(passwordEncoder
                        .encode(person.getJSONObject("id").optString("value", person.getString("phone"))));
                user.setRoles(List.of("USER"));
                users.save(user);

            }

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
            String avatarUrlUser = "/static/avatar/predAvatar.png";
            try {
                setProfileAvatarContent(user2, avatarUrlUser);
            } catch (IOException e) {
                e.printStackTrace();
            }
            users.save(user2);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Util util = new Util(0, 0, 11);
        utilService.save(util);
    }

    public Blob downloadImage(String urlString) throws Exception {
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.connect();

        try (InputStream inputStream = connection.getInputStream();
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[4096];
            int n;
            while ((n = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, n);
            }
            Blob blob = new SerialBlob(outputStream.toByteArray());
            return blob;
        } finally {
            connection.disconnect();
        }
    }

    private void createEntities() {
        User entity1 = new User();
        entity1.setName("Fernando");
        entity1.setLastName("Ane");
        entity1.setUsername("33W");
        entity1.setPhone("711548969");
        entity1.setEmail("admin100@smilelink.com");
        entity1.setPasswordEncoded(passwordEncoder.encode("12345"));
        entity1.setRoles(List.of("USER", "DOCTOR", "ADMIN"));
        entity1.setBirth(LocalDate.now());
        entity1.setGender("Masculino");
        entity1.setCodEntity(100L);
        String avatarUrlAdmin = "/static/avatar/predAdminAvatar.png";
        try {
            setProfileAvatarContent(entity1, avatarUrlAdmin);
        } catch (IOException e) {
            e.printStackTrace();
        }
        users.save(entity1);

        Util util = new Util(0, 0, 0);
        utilService.save(util);

        User entity2 = new User();

        entity2.setName("Jose Luis");
        entity2.setLastName("Rodriguez");
        entity2.setUsername("332W");
        entity2.setPhone("785264122");
        entity2.setEmail("admin200@smilelink.com");
        entity2.setCodEntity(200L);
        entity2.setPasswordEncoded(passwordEncoder.encode("12345"));
        entity2.setRoles(List.of("USER", "DOCTOR", "ADMIN"));
        entity2.setBirth(LocalDate.now());
        entity2.setGender("Masculino");
        avatarUrlAdmin = "/static/avatar/predAdminAvatar.png";
        try {
            setProfileAvatarContent(entity2, avatarUrlAdmin);
        } catch (IOException e) {
            e.printStackTrace();
        }
        users.save(entity2);
    }

    private void createSuperAdmin(User userSuperAdmin) {
        userSuperAdmin.setName("Administrador");
        userSuperAdmin.setLastName("Administrador");
        userSuperAdmin.setUsername("");
        userSuperAdmin.setEmail("admin@smilelink.com");
        userSuperAdmin.setPasswordEncoded(passwordEncoder.encode("superpassword12345"));
        userSuperAdmin.setRoles(List.of("ADMIN"));
        String avatarUrlAdmin = "/static/avatar/administrador.png";
        try {
            setProfileAvatarContent(userSuperAdmin, avatarUrlAdmin);
        } catch (IOException e) {
            e.printStackTrace();
        }
        users.save(userSuperAdmin);
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

    public void createDoctors() {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(
                        "https://randomuser.me/api/?results=6&inc=gender,name,location,email,dob,phone,cell,id,picture,nat"))
                .header("accept", "application/json")
                .build();

        try {
            HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
            JSONObject obj = new JSONObject(response.body());

            JSONArray array = obj.getJSONArray("results");

            for (int i = 0; i < array.length(); i++) {
                JSONObject person = array.getJSONObject(i);
                JSONObject nameObject = person.getJSONObject("name");
                JSONObject locationObject = person.getJSONObject("location");
                JSONObject dobObject = person.getJSONObject("dob");

                User user = new User();
                user.setName(nameObject.getString("first"));
                user.setLastName(nameObject.getString("last"));
                user.setUsername(person.getJSONObject("id").optString("value", person.getString("phone")));
                LocalDate birthDate = LocalDate.parse(dobObject.getString("date").substring(0, 10));
                user.setBirth(birthDate);
                user.setCodEntity(i % 2 == 0 ? 100L : 200L);
                user.setPhone(person.getString("phone"));
                user.setEmail(nameObject.getString("first")+"."+nameObject.getString("last")+"@smilelink.com");
                user.setCity(locationObject.getString("city"));
                user.setAddress(locationObject.getJSONObject("street").getInt("number") + " "
                        + locationObject.getJSONObject("street").getString("name"));
                String postalCode = String.valueOf(locationObject.optInt("postcode", 28820));
                user.setPostalCode(postalCode);
                user.setGender("male".equals(person.getString("gender")) ? "Masculino" : "Femenino");
                user.setCountry(locationObject.getString("country"));
                user.setProfileAvatarFile(downloadImage(person.getJSONObject("picture").getString("large")));
                user.setPasswordEncoded(passwordEncoder
                        .encode(person.getJSONObject("id").optString("value", person.getString("phone"))));
                user.setRoles(List.of("DOCTOR"));
                users.save(user);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        User user = new User();
        user.setName("Jaime");
        user.setLastName("Flores");
        user.setUsername("37W");
        user.setPhone("444444444");
        user.setEmail("jaime.flores@smilelink.com");
        user.setPasswordEncoded(passwordEncoder.encode("pass"));
        user.setRoles(List.of("DOCTOR"));
        user.setBirth(LocalDate.now().minusYears(20 + 11));
        user.setGender("Masculino");
        user.setCodEntity(200L);
        user.setAddress("Calle " + 11);
        user.setCity("Ciudad " + 11);
        user.setCountry("País " + 11);
        user.setPostalCode("CodigoPostal" + 11);

        String avatarUrl = "/static/avatar/predAdminAvatar.png";
        
        try {
            setProfileAvatarContent(user, avatarUrl);
        } catch (IOException e) {
            e.printStackTrace();
        }

        users.save(user);
    }
}