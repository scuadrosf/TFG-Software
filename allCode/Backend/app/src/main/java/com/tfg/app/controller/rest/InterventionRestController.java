package com.tfg.app.controller.rest;

import java.net.URI;
import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
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

import com.tfg.app.model.Appointment;
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
            @RequestParam(value = "type", required = true) String type) {
        Optional<Appointment> currentApointment = appointmentService.findById(appointmentId);
        LocalDate date = LocalDate.now();
        if (currentApointment.isPresent()) {
            Intervention intervention = new Intervention();
            intervention.setInterventionDate(date);
            intervention.setAppointment(currentApointment.get());
            intervention.setDocuments(new ArrayList<>());
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

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateIntevention(@PathVariable Long id,
            @RequestParam(value = "type", required = true) String type) {
        Intervention intervention = interventionService.findById(id).orElseThrow();
        if (type != null) {
            intervention.setType(type);
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

}
