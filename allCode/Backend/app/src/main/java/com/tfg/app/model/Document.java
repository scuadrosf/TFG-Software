package com.tfg.app.model;

import java.sql.Blob;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Entity (name = "docTable")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDate creationDate;
    private String link;

    @Lob
    private Blob file;

    @ManyToOne
    private Intervention intervention;


    public Document(Long id, LocalDate creationDate, String link, Blob file, Intervention intervention) {
        this.id = id;
        this.creationDate = creationDate;
        this.link = link;
        this.file = file;
        this.intervention = intervention;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Blob getFile() {
        return file;
    }

    public void setFile(Blob file) {
        this.file = file;
    }

    public Intervention getIntervention() {
        return intervention;
    }

    public void setIntervention(Intervention intervention) {
        this.intervention = intervention;
    }

    
    
}
