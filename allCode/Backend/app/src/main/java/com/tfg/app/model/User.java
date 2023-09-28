package com.tfg.app.model;

import java.sql.Blob;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;

import com.tfg.app.controller.DTOS.UserDTO;

@Entity (name = "userTable")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String lastName;
    private String DNI;

    @Column(nullable = false, unique = true)
    private String email;

    private String passwordEncoded;

    private String address;
    private String city;
    private String country;
    private int postalCode;
    private int phone;
    private String gender;
    private LocalDate birth;


    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles;

    @Lob
    private Blob profileAvatarFile;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Intervention> interventions;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Appointment> appointments;


    public User(Long id, String name, String lastName, String dNI, String email, String passwordEncoded, String address,
            String city, String country, int postalCode, int phone, String gender, LocalDate birth, List<String> roles,
            Blob profileAvatarFile, List<Intervention> interventions, List<Appointment> appointments) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        DNI = dNI;
        this.email = email;
        this.passwordEncoded = passwordEncoded;
        this.address = address;
        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
        this.phone = phone;
        this.gender = gender;
        this.birth = birth;
        this.roles = roles;
        this.profileAvatarFile = profileAvatarFile;
        this.interventions = interventions;
        this.appointments = appointments;
    }

    public User(UserDTO userDTO) {
        super();
        this.name = userDTO.getName();
        this.lastName = userDTO.getLastName();
        this.DNI = userDTO.getDNI();
        this.email = userDTO.getEmail();
        this.passwordEncoded = userDTO.getPasswordEncoded();
        this.address = userDTO.getAddress();
        this.city = userDTO.getCity();
        this.country = userDTO.getCountry();
        this.postalCode = userDTO.getPostalCode();
        this.phone = userDTO.getPhone();
        this.gender = userDTO.getGender();
        this.birth = userDTO.getBirth();
        this.roles = List.of("USER");
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDNI() {
        return DNI;
    }

    public void setDNI(String dNI) {
        DNI = dNI;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordEncoded() {
        return passwordEncoded;
    }

    public void setPasswordEncoded(String passwordEncoded) {
        this.passwordEncoded = passwordEncoded;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(int postalCode) {
        this.postalCode = postalCode;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getBirth() {
        return birth;
    }

    public void setBirth(LocalDate birth) {
        this.birth = birth;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public Blob getProfileAvatarFile() {
        return profileAvatarFile;
    }

    public void setProfileAvatarFile(Blob profileAvatarFile) {
        this.profileAvatarFile = profileAvatarFile;
    }


    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public List<Intervention> getInterventions() {
        return interventions;
    }

    public void setInterventions(List<Intervention> interventions) {
        this.interventions = interventions;
    }

    
    
}
