package main.java.com.tfg.app.model;

import java.sql.Blob;

@Entity(name = "docTable")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Date creationDate;
    private String link;

    @Lob
    private Blob file;

    @OneToOne
    private Intervention intervention;

    @OneToOne 
    private User user;
}
