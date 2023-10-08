package com.tfg.app.controller.DTOS;

import java.time.LocalDate;
import java.util.Optional;

import com.tfg.app.model.Appointment;
import com.tfg.app.model.User;

public class InterventionDTO {
    
    private LocalDate interventionDate;
    private String type;
    private User user;
    private Optional<Appointment> appointment;
    
    

    

    

    public InterventionDTO(LocalDate interventionDate, String type, User user, Optional<Appointment> currentApointment) {
        this.interventionDate = interventionDate;
        this.type = type;
        this.user = user;
        this.appointment = currentApointment;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

   

    public LocalDate getInterventionDate() {
        return interventionDate;
    }

    public void setInterventionDate(LocalDate interventionDate) {
        this.interventionDate = interventionDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Optional<Appointment> getAppointment() {
        return appointment;
    }

    public void setAppointment(Optional<Appointment> appointment) {
        this.appointment = appointment;
    }

    
}