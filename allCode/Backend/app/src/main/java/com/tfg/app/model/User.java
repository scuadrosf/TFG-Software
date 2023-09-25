package main.java.com.tfg.app.model;

@Entity(name ="userTable")
public class User {
 
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String lastName;
    private String DNI;

    @Column(nullable = false, unique = true)
    private String email;

    private String encodedPassword;

    private String address;
    private String city;
    private String country;
    private int postalCode;
    private int phone;
    private String genre;
    private Date birth;


    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles;

    @Lob
    private Blob profileAvatarFile;


    @OneToMany
    private Intervention intervention;

    @OneToMany
    private Appointment appointment;

    @OneToMany
    private List<Document> documents;

    
    public User(Long id, String name, String lastName, String dNI, String email, String encodedPassword, String address,
            String city, String country, int postalCode, int phone, String genre, Date birth, List<String> roles,
            Blob profileAvatarFile) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        DNI = dNI;
        this.email = email;
        this.encodedPassword = encodedPassword;
        this.address = address;
        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
        this.phone = phone;
        this.genre = genre;
        this.birth = birth;
        this.roles = roles;
        this.profileAvatarFile = profileAvatarFile;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDNI() {
        return DNI;
    }

    public void setDNI(String dNI) {
        DNI = dNI;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEncodedPassword() {
        return encodedPassword;
    }

    public void setEncodedPassword(String encodedPassword) {
        this.encodedPassword = encodedPassword;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(int postalCode) {
        this.postalCode = postalCode;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public Blob getProfileAvatarFile() {
        return profileAvatarFile;
    }

    public void setProfileAvatarFile(Blob profileAvatarFile) {
        this.profileAvatarFile = profileAvatarFile;
    }


    
}
