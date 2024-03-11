package com.tfg.app.controller.DTOS;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tfg.app.model.User;

public class AppointmentDTO {

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate bookDate;
    @JsonFormat(pattern="HH:mm")
    private LocalTime fromDate;
    @JsonFormat(pattern="HH:mm")
    private LocalTime toDate;
    private String description;
    private String additionalNote;
    private boolean completed;
    private User doctorAsignated;
    private Long codEntity;


    public AppointmentDTO(LocalDate bookDate, LocalTime fromDate, LocalTime toDate, String description,
            String additionalNote, boolean completed, User doctorAsignated, Long codEntity) {
        this.bookDate = bookDate;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.description = description;
        this.additionalNote = additionalNote;
        this.completed = completed;
        this.doctorAsignated = doctorAsignated;
        this.codEntity = codEntity;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAdditionalNote() {
        return additionalNote;
    }

    public void setAdditionalNote(String additionalNote) {
        this.additionalNote = additionalNote;
    }

    public boolean getCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public User getDoctorAsignated() {
        return doctorAsignated;
    }

    public void setDoctorAsignated(User doctorAsignated) {
        this.doctorAsignated = doctorAsignated;
    }

    public Long getCodEntity() {
        return codEntity;
    }

    public void setCodEntity(Long codEntity) {
        this.codEntity = codEntity;
    }

}
