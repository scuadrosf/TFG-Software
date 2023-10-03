package com.tfg.app.controller.rest;

import static org.springframework.web.servlet.support.ServletUriComponentsBuilder.fromCurrentRequest;

import java.net.URI;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.app.controller.DTOS.AppointmentDTO;
import com.tfg.app.model.Appointment;
import com.tfg.app.model.User;
import com.tfg.app.service.AppointmentService;
import com.tfg.app.service.UserService;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentRestController {

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
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointmentList = appointmentService.findAll();
        return ResponseEntity.ok(appointmentList);
    }

    @PostMapping("/")
    public ResponseEntity<Appointment> addAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        Appointment appointment = new Appointment(appointmentDTO);
        appointment.setUser(currentUser);
        appointment.setInterventions(new ArrayList<>());
        appointmentService.save(appointment);
        URI location = fromCurrentRequest().path("/{id}").buildAndExpand(appointment.getId()).toUri();
        return ResponseEntity.created(location).body(appointment);
    }
}
