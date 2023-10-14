package com.tfg.app.controller.DTOS;

import java.time.LocalDate;
import java.util.List;
import com.tfg.app.model.Appointment;
import com.tfg.app.model.Document;
import com.tfg.app.model.User;

public class InterventionDTO {

    private Long id;
    private LocalDate interventionDate;
    private String type;
    // private User user;
    // private Appointment appointment;
    // private List<Document> documents;

    public InterventionDTO(LocalDate interventionDate, String type, User user, Appointment appointment,
            List<Document> documents) {
        this.interventionDate = interventionDate;
        this.type = type;
        // this.user = user;
        // this.appointment = appointment;
        // this.documents = documents;
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

    // public User getUser() {
    //     return user;
    // }

    // public void setUser(User user) {
    //     this.user = user;
    // }

    // public Appointment getAppointment() {
    //     return appointment;
    // }

    // public void setAppointment(Appointment appointment) {
    //     this.appointment = appointment;
    // }

    // public List<Document> getDocuments() {
    //     return documents;
    // }

    // public void setDocuments(List<Document> documents) {
    //     this.documents = documents;
    // }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    
}