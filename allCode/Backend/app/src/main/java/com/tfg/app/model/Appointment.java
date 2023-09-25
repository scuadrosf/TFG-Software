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
}
