package com.tfg.app.controller.DTOS;

public class UserEditDTO {
    private String name;
    private String email;
    private String passwordEncoded;
    private String address;
    private String city;
    private String country;
    private int postalCode;
    private int phone;


    public UserEditDTO(String name, String email, String passwordEncoded, String address, String city, String country,
            int postalCode, int phone) {
        this.name = name;
        this.email = email;
        this.passwordEncoded = passwordEncoded;
        this.address = address;
        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
        this.phone = phone;
    }


    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
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

    
}
