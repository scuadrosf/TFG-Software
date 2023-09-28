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

@Entity(name = "appointmentTable")
public class Appointment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDate bookDate;
    private LocalDate fromDate;
    private LocalDate toDate;
    private String description;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL)
    private List<Intervention> interventions;

    @ManyToOne
    private User user;

    public Appointment(Long id, LocalDate bookDate, LocalDate from, LocalDate to, String description, List<Intervention> interventions,
            User user) {
        this.id = id;
        this.bookDate = bookDate;
        this.fromDate = from;
        this.toDate = to;
        this.description = description;
        this.interventions = interventions;
        this.user = user;
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

    public LocalDate getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getToDate() {
        return toDate;
    }

    public void setToDate(LocalDate toDate) {
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

    public List<Intervention> getIntervention() {
        return interventions;
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

    
}
