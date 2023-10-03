package com.tfg.app.controller.rest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.app.controller.DTOS.InterventionDTO;
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


    @GetMapping("/all")
    public ResponseEntity<List<Intervention>> getAllInterventions(){
        List<Intervention> interventionList = interventionService.findAll();
        return ResponseEntity.ok().body(interventionList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Intervention> getInterventionById(@PathVariable Long id){
        Optional<Intervention> intervention = interventionService.findById(id);
        if (intervention.isPresent()){
            Intervention interventionAux = intervention.get();
            return new ResponseEntity<>(interventionAux, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<Object> addIntervention (@PathVariable Long id){
        Optional<Appointment> currentApointment = appointmentService.findById(id);
        LocalDate date = LocalDate.now();
        if (currentApointment.isPresent()){
            Intervention intervention = new Intervention(currentUser, date);
            interventionService.save(intervention);
            InterventionDTO interventionDTO = new InterventionDTO(date, intervention.getType(), currentUser.getId(), id);
            return ResponseEntity.status(HttpStatus.CREATED).body(interventionDTO);
        }else{
            String errorMessage = "Primero debe pedir cita";
            return ResponseEntity.badRequest().body(errorMessage);
        }

        // Intervention intervention = new Intervention(interventionDTO);
        // interventionService.save(intervention);
        // URI location = fromCurrentRequest().path("/{id}").buildAndExpand(intervention.getId()).toUri();
        // return ResponseEntity.created(location).body(intervention);

    }
}
