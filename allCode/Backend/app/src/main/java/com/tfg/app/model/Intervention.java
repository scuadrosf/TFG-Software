package com.tfg.app.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity(name = "interventionTable")
public class Intervention {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User user;

    private LocalDate interventionDate;
    private String type;

    @OneToMany(mappedBy = "intervention", cascade = CascadeType.ALL)
    private List<Document> documents;

    @ManyToOne
    private Appointment appointment;

    public Intervention(Long id, User user, LocalDate interventionDate, String type, List<Document> documents) {
        this.id = id;
        this.user = user;
        this.interventionDate = interventionDate;
        this.type = type;
        this.documents = documents;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


   

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
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

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    
}
