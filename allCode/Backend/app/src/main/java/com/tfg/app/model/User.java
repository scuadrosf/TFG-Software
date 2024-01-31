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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tfg.app.controller.DTOS.UserDTO;
import com.tfg.app.controller.DTOS.UserDoctorDTO;
import com.tfg.app.controller.DTOS.UserEditDTO;

@Entity (name = "userTable")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String lastName;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonIgnore
    private String passwordEncoded;

    private String address;
    private String city;
    private String country;
    private String postalCode;
    private String phone;
    private String gender;
    private String speciality;

    @JsonFormat(pattern="dd-MM-yyyy")
    private LocalDate birth;


    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles;

    @Lob
    @JsonIgnore
    private Blob profileAvatarFile;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Intervention> interventions;
    
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Appointment> appointments;

    @ManyToOne
    private User doctorAsignated;

    private Long codEntity;




    public User() {
    }

    public User(UserEditDTO editDTO){
        super();
        this.email = editDTO.getEmail();
        this.passwordEncoded = editDTO.getPasswordEncoded();
        this.address = editDTO.getAddress();
        this.city = editDTO.getCity();
        this.country = editDTO.getCountry();
        this.postalCode = editDTO.getPostalCode();
        this.phone = editDTO.getPhone();
    }

    public User(String name, String username, String email, String passwordEncoded, String ... roles) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.passwordEncoded = passwordEncoded;
        this.roles = List.of(roles);
    }

    public User(Long id, String name, String lastName, String username, String email, String passwordEncoded, String address,
            String city, String country, String postalCode, String phone, String gender, LocalDate birth, List<String> roles,
            Blob profileAvatarFile, List<Intervention> interventions, List<Appointment> appointments) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.username = username;
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
        this.username = userDTO.getUsername();
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
        this.doctorAsignated = userDTO.getDoctorAsignated();
        this.codEntity = userDTO.getCodEntity();
    }

    public User(UserDoctorDTO userDoctorDTO) {
        super();
        this.name = userDoctorDTO.getName();
        this.lastName = userDoctorDTO.getLastName();
        this.username = userDoctorDTO.getUsername();
        this.email = userDoctorDTO.getEmail();
        this.passwordEncoded = userDoctorDTO.getPasswordEncoded();
        this.address = userDoctorDTO.getAddress();
        this.city = userDoctorDTO.getCity();
        this.country = userDoctorDTO.getCountry();
        this.postalCode = userDoctorDTO.getPostalCode();
        this.phone = userDoctorDTO.getPhone();
        this.gender = userDoctorDTO.getGender();
        this.birth = userDoctorDTO.getBirth();
        this.roles = List.of("DOCTOR");
        this.speciality = userDoctorDTO.getSpeciality();
    }

    public User(String username, String password) {
        this.username = username;
        this.passwordEncoded = password;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
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

    // public void setRoles(String ... roles) {
    //     this.roles = List.of(roles);
    // }

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

    public String getEncodedPassword() {
        return passwordEncoded;
    }

    public String getSpeciality() {
        return speciality;
    }

    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    public User getDoctorAsignated() {
        return doctorAsignated;
    }

    public void setDoctorAsignated(User doctorAsignated) {
        this.doctorAsignated = doctorAsignated;
    }

    public Long getCodEntity() {
        return codEntity;
    }

    public void setCodEntity(Long codEntity) {
        this.codEntity = codEntity;
    }

    


    
    
}
