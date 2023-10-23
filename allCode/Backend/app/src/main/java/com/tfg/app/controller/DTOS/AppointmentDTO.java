package com.tfg.app.controller.DTOS;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class AppointmentDTO {

    private LocalDate bookDate;
    private LocalDateTime fromDate;
    private LocalDateTime toDate;
    private String description;
    private String additionalNote;
    private boolean completed;
    
    public AppointmentDTO(LocalDate bookDate, LocalDateTime fromDate, LocalDateTime toDate, String description, String additionalNote, boolean completed) {
        this.bookDate = bookDate;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.description = description;
        this.additionalNote = additionalNote;
        this.completed = completed;
    }

    public LocalDate getBookDate() {
        return bookDate;
    }

    public void setBookDate(LocalDate bookDate) {
        this.bookDate = bookDate;
    }

    public LocalDateTime getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDateTime fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDateTime getToDate() {
        return toDate;
    }

    public void setToDate(LocalDateTime toDate) {
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
    
}
