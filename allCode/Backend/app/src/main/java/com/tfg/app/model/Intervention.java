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

    public Intervention(Long id, User user, Date interventionDate, String type, List<Document> documents) {
        this.id = id;
        this.user = user;
        this.interventionDate = interventionDate;
        this.type = type;
        this.documents = documents;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getInterventionDate() {
        return interventionDate;
    }

    public void setInterventionDate(Date interventionDate) {
        this.interventionDate = interventionDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }


    

}
