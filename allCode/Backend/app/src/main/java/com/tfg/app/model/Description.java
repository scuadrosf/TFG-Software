package com.tfg.app.model;

import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity(name = "descriptionTable")
public class Description {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nameDescription;
    private String nameIntervention;
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime timeToIntervention;

    public Description(Long id, String nameDescription, String nameIntervention, LocalTime timeToIntervention) {
        this.id = id;
        this.nameDescription = nameDescription;
        this.nameIntervention = nameIntervention;

        this.timeToIntervention = timeToIntervention;
    }

    public Description() {
    }

    public String getNameIntervention() {
        return nameIntervention;
    }

    public void setNameIntervention(String nameIntervention) {
        this.nameIntervention = nameIntervention;
    }

    public LocalTime getTimeToIntervention() {
        return timeToIntervention;
    }

    public void setTimeToIntervention(LocalTime timeToIntervention) {
        this.timeToIntervention = timeToIntervention;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameDescription() {
        return nameDescription;
    }

    public void setNameDescription(String nameDescription) {
        this.nameDescription = nameDescription;
    }

}
