package com.tfg.app.model;

import java.time.LocalDate;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name = "interventionTable")
public class Intervention {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User user;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate interventionDate;
    private String type;

    @JsonIgnore
    @OneToOne(mappedBy = "intervention", cascade = CascadeType.ALL)
    private Document document;

    @JsonIgnore
    @ManyToOne
    private Appointment appointment;

    public Intervention(User user, LocalDate interventionDate) {
        this.user = user;
        this.interventionDate = interventionDate;
    }

    public Intervention(User user, LocalDate interventionDate, String type, Document document,
            Appointment appointment) {
        this.user = user;
        this.interventionDate = interventionDate;
        this.type = type;
        this.document = document;
        this.appointment = appointment;
    }

    public Intervention(User currentUser, Appointment appointment2, Document document, LocalDate date) {
        this.user = currentUser;
        this.appointment = appointment2;
        this.document = document;
        this.interventionDate = date;
    }

    public Intervention(User currentUser, Appointment appointment) {
        this.user = currentUser;
        this.appointment = appointment;
    }

    public Intervention() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment currentApointment) {
        this.appointment = currentApointment;
    }

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

}
