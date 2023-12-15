package com.tfg.app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "utilTable")
public class Util {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int appointmentsCompletedYesterday;

    private int numPatientsYesterday;

    private int numPatientsTotal;

    public Util() {
    }

    public Util(int appointmentsCompletedYesterday, int numPatientsYesterday, int numPatientsTotal) {
        this.appointmentsCompletedYesterday = appointmentsCompletedYesterday;
        this.numPatientsYesterday = numPatientsYesterday;
        this.numPatientsTotal = numPatientsTotal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAppointmentsCompletedYesterday() {
        return appointmentsCompletedYesterday;
    }

    public void setAppointmentsCompletedYesterday(int appointmentsCompletedYesterday) {
        this.appointmentsCompletedYesterday = appointmentsCompletedYesterday;
    }

    public int getNumPatientsYesterday() {
        return numPatientsYesterday;
    }

    public void setNumPatientsYesterday(int numPatientsYesterday) {
        this.numPatientsYesterday = numPatientsYesterday;
    }

    public int getNumPatientsTotal() {
        return numPatientsTotal;
    }

    public void setNumPatientsTotal(int numPatientsTotal) {
        this.numPatientsTotal = numPatientsTotal;
    }

    

}