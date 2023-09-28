package com.tfg.app.controller.DTOS;

import java.time.LocalDate;

public class UserDTO {
    
    private String name;
    private String lastName;
    private String DNI;
    private String email;
    private String passwordEncoded;
    private String address;
    private String city;
    private String country;
    private int postalCode;
    private int phone;
    private String gender;
    private LocalDate birth;

    public UserDTO(String name, String lastName, String dNI, String email, String passwordEncoded, String address,
            String city, String country, int postalCode, int phone, String gender, LocalDate birth) {
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

    public String getPasswordEncoded() {
        return passwordEncoded;
    }

    

    
}
