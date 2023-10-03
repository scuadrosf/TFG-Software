package com.tfg.app.controller.DTOS;

import java.time.LocalDate;

public class InterventionDTO {
    
    private LocalDate interventionDate;
    private String type;
    private Long idUser;
    private Long idAppointment;
    
    

    public InterventionDTO(LocalDate interventionDate, String type, Long idUser, Long idAppointment) {
        this.interventionDate = interventionDate;
        this.type = type;
        this.idUser = idUser;
        this.idAppointment = idAppointment;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Long getIdAppointment() {
        return idAppointment;
    }

    public void setIdAppointment(Long idAppointment) {
        this.idAppointment = idAppointment;
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

    
}
