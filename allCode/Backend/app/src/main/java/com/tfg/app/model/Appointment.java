package com.tfg.app.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tfg.app.controller.DTOS.AppointmentDTO;

@Entity(name = "appointmentTable")
public class Appointment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate bookDate;
    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime fromDate;
    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime toDate;
    private String description;
    private String additionalNote;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL)
    private List<Intervention> interventions;

    @ManyToOne
    private User user;

    private boolean completed;

    public Appointment(Long id, LocalDate bookDate, LocalTime from, LocalTime to, String description, List<Intervention> interventions,
            User user, boolean completed) {
        this.id = id;
        this.bookDate = bookDate;
        this.fromDate = from;
        this.toDate = to;
        this.description = description;
        this.interventions = interventions;
        this.user = user;
        this.completed = completed;
    }

    public Appointment() {
    }

    public Appointment(AppointmentDTO appointmentDTO) {
        super();
        this.bookDate = appointmentDTO.getBookDate();
        this.fromDate = appointmentDTO.getFromDate();
        this.toDate = appointmentDTO.getToDate();
        this.description = appointmentDTO.getDescription();
        this.additionalNote = appointmentDTO.getAdditionalNote();
        this.completed = appointmentDTO.getCompleted();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

   

    public LocalDate getBookDate() {
        return bookDate;
    }

    public void setBookDate(LocalDate bookDate) {
        this.bookDate = bookDate;
    }

    public LocalTime getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalTime fromDate) {
        this.fromDate = fromDate;
    }

    public LocalTime getToDate() {
        return toDate;
    }

    public void setToDate(LocalTime toDate) {
        this.toDate = toDate;
    }

    public List<Intervention> getInterventions() {
        return interventions;
    }

    

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setInterventions(List<Intervention> interventions) {
        this.interventions = interventions;
    }

    public String getAdditionalNote() {
        return additionalNote;
    }

    public void setAdditionalNote(String additionalNote) {
        this.additionalNote = additionalNote;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    
}
