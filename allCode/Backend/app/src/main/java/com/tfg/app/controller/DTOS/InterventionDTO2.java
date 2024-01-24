package com.tfg.app.controller.DTOS;

public class InterventionDTO2 {
    private Long id;
    private String appointmentDescription;

    public InterventionDTO2(Long id, String appointmentDescription) {
        this.id = id;
        this.appointmentDescription = appointmentDescription;
    }
    public InterventionDTO2() {
    }
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getAppointmentDescription() {
        return appointmentDescription;
    }
    public void setAppointmentDescription(String appointmentDescription) {
        this.appointmentDescription = appointmentDescription;
    }

    
    
}
