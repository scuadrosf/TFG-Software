package main.java.com.tfg.app.model;

@Entity(name = "interventionTable")
public class Intervention {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User user;

    private Date interventionDate;
    private String type;

    @OneToOne
    private List<Document> documents;

}
