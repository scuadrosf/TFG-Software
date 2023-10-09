package com.tfg.app.controller.rest;

import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.app.model.Appointment;
import com.tfg.app.model.Intervention;
import com.tfg.app.model.User;
import com.tfg.app.service.AppointmentService;
import com.tfg.app.service.InterventionService;
import com.tfg.app.service.UserService;

@RestController
@RequestMapping("/api/interventions")
public class InterventionRestController {
    @Autowired
    private InterventionService interventionService;

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

    @GetMapping("/{id}")
    public ResponseEntity<Intervention> getInterventionById(@PathVariable Long id) {
        Optional<Intervention> intervention = interventionService.findById(id);
        if (intervention.isPresent()) {
            Intervention interventionAux = intervention.get();
            return new ResponseEntity<>(interventionAux, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{appointmentId}")
    public ResponseEntity<Object> addIntervention(@PathVariable("appointmentId") Long appointmentId, @RequestBody Intervention intervention) {
        Optional<Appointment> currentApointment = appointmentService.findById(appointmentId);
        LocalDate date = LocalDate.now();
        if (currentApointment.isPresent()) {
            intervention.setUser(currentUser);
            intervention.setInterventionDate(date);
            intervention.setAppointment(currentApointment.get());
            currentApointment.get().getInterventions().add(intervention);
            interventionService.save(intervention);
            return ResponseEntity.status(HttpStatus.CREATED).body(intervention);
        } else {
            String errorMessage = "Primero debe pedir cita";
            return ResponseEntity.badRequest().body(errorMessage);
        }

        // Intervention intervention = new Intervention(interventionDTO);
        // interventionService.save(intervention);
        // URI location =
        // fromCurrentRequest().path("/{id}").buildAndExpand(intervention.getId()).toUri();
        // return ResponseEntity.created(location).body(intervention);

    }
}
