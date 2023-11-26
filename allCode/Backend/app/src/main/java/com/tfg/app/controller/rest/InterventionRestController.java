package com.tfg.app.controller.rest;

import java.io.IOException;
import java.net.URI;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import static org.springframework.web.servlet.support.ServletUriComponentsBuilder.fromCurrentRequest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tfg.app.model.Appointment;
import com.tfg.app.model.Document;
import com.tfg.app.model.Intervention;
import com.tfg.app.model.User;
import com.tfg.app.repository.InterventionRepository;
import com.tfg.app.service.AppointmentService;
import com.tfg.app.service.InterventionService;
import com.tfg.app.service.UserService;

@RestController
@RequestMapping("/api/interventions")
public class InterventionRestController {
    @Autowired
    private InterventionService interventionService;
    @Autowired
    private InterventionRepository interventionRepository;

    @Autowired
    private UserService userService;
    @Autowired
    private AppointmentService appointmentService;

    User currentUser;

    @ModelAttribute
    public void addAttributes(Model model, HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();

        if (principal != null) {
            userService.findByEmail(principal.getName()).ifPresent(us -> currentUser = us);
            model.addAttribute("curretUser", currentUser);

        } else {
            model.addAttribute("logged", false);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Intervention>> getAllInterventions() {
        List<Intervention> interventionList = interventionService.findAll();
        return ResponseEntity.ok().body(interventionList);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Intervention>> getUserIntervention(@PathVariable("userId") Long id) {
        Optional<User> user = userService.findById(id);
        if (user.isPresent()) {
            List<Intervention> interventionList = interventionService.findByUserId(user.get().getId());
            return ResponseEntity.ok().body(interventionList);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/{appointmentId}/user={userId}")
    public ResponseEntity<Object> addIntervention(@PathVariable("appointmentId") Long appointmentId,
            @PathVariable("userId") Long userId,
            @RequestParam(value = "type", required = true) String type,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        Optional<Appointment> currentApointment = appointmentService.findById(appointmentId);
        LocalDate date = LocalDate.now();
        if (currentApointment.isPresent()) {
            Intervention intervention = new Intervention();
            if (file != null) {
                Document document = new Document();
                document.setFileName(file.getOriginalFilename());
                document.setCreationDate(date);
                document.setUser(userService.findById(userId).get());
                try {
                    document.setFile(file.getBytes());
                } catch (IOException e) {
                    e.printStackTrace();
                }
                intervention.setDocument(document);
                document.setIntervention(intervention);

            }

            intervention.setInterventionDate(date);
            intervention.setAppointment(currentApointment.get());

            intervention.setType(type);
            User user = userService.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid User Id: " + userId));
            if (user != null)
                intervention.setUser(user);

            currentApointment.get().getInterventions().add(intervention);

            interventionService.save(intervention);
            appointmentService.save(currentApointment.get());

            URI location = fromCurrentRequest().path("/{id}").buildAndExpand(intervention.getId()).toUri();
            return ResponseEntity.created(location).body(intervention);
        } else {
            String errorMessage = "Primero debe pedir cita";
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

    @PutMapping("/update/{id}/user={userId}")
    public ResponseEntity<?> updateIntevention(@PathVariable Long id,
            @PathVariable("userId") Long userId,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "file", required = false) MultipartFile file)
    {
        Intervention intervention = interventionService.findById(id).orElseThrow();
        if (type != null) {
            intervention.setType(type);
        }
        if (file != null) {
            Optional<Document> document = interventionService.getDocumentByInterventionId(id);
            if (document.isPresent()) {
                try {
                    document.get().setFile(file.getBytes());
                    document.get().setFileName(file.getOriginalFilename());
                    document.get().setCreationDate(LocalDate.now());
                    intervention.setDocument(document.get());
                    document.get().setIntervention(intervention);
                    User user = userService.findById(userId)
                            .orElseThrow(() -> new IllegalArgumentException("Invalid User Id: " + userId));
                    if (user != null)
                        intervention.setUser(user);
                    document.get().setUser(user);
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            } else {
                Document doc = new Document();
                try {
                    doc.setFile(file.getBytes());
                    doc.setFileName(file.getOriginalFilename());
                    doc.setCreationDate(LocalDate.now());
                    intervention.setDocument(doc);
                    doc.setIntervention(intervention);
                    User user = userService.findById(userId)
                            .orElseThrow(() -> new IllegalArgumentException("Invalid User Id: " + userId));
                    if (user != null)
                        intervention.setUser(user);
                    doc.setUser(user);
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }

        }
        Intervention updatedIntervention = interventionRepository.save(intervention);
        return ResponseEntity.ok(updatedIntervention);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteIntervention(@PathVariable Long id) {
        Optional<Intervention> interventionOptional = interventionService.findById(id);
        try {
            if (interventionOptional.isPresent()) {
                interventionService.delete(id);
            }
            return ResponseEntity.ok("Intervention eliminado con éxito.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar la intervention: " + e.getMessage());
        }
    }

    @GetMapping("each/{id}")
    public ResponseEntity<Intervention> getIntervention(@PathVariable Long id) {
        Optional<Intervention> interventionData = interventionService.findById(id);
        if (!interventionData.isEmpty()) {
            return ResponseEntity.ok(interventionData.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("{id}/document")
    public ResponseEntity<Document> getDocument(@PathVariable Long id) {
        return ResponseEntity.ok().body(interventionService.getDocumentByInterventionId(id).get());
    }

}
