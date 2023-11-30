package com.tfg.app.controller.DTOS;

import java.sql.Blob;

public class UserEditDTO {
    private String email;
    private String passwordEncoded;
    private String address;
    private String city;
    private String country;
    private String postalCode;
    private String phone;
    private Blob profileAvatarFile;


    public UserEditDTO(String email, String passwordEncoded, String address, String city, String country,
    String postalCode, String phone, Blob profileAvatarFile) {
        this.email = email;
        this.passwordEncoded = passwordEncoded;
        this.address = address;
        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
        this.phone = phone;
        this.profileAvatarFile = profileAvatarFile;
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


    public Blob getProfileAvatarFile() {
        return profileAvatarFile;
    }


    public void setProfileAvatarFile(Blob profileAvatarFile) {
        this.profileAvatarFile = profileAvatarFile;
    }

 
}
