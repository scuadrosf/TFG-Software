package main.java.com.tfg.app.model;


@Entity(name = "appointmentTable")
public class Appointment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Date bookDate;
    private Date From;
    private Date To;
    private String description;

    private Intervention intervention;

    @ManyToOne
    private User user;



    
    public Appointment(Long id, Date bookDate, Date from, Date to, String description, Intervention intervention,
            User user) {
        this.id = id;
        this.bookDate = bookDate;
        From = from;
        To = to;
        this.description = description;
        this.intervention = intervention;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getBookDate() {
        return bookDate;
    }

    public void setBookDate(Date bookDate) {
        this.bookDate = bookDate;
    }

    public Date getFrom() {
        return From;
    }

    public void setFrom(Date from) {
        From = from;
    }

    public Date getTo() {
        return To;
    }

    public void setTo(Date to) {
        To = to;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Intervention getIntervention() {
        return intervention;
    }

    public void setIntervention(Intervention intervention) {
        this.intervention = intervention;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    
}
