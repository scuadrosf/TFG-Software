package com.tfg.app.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.app.model.Appointment;
import com.tfg.app.model.Intervention;
import com.tfg.app.repository.AppointmentRepository;
import com.tfg.app.repository.InterventionRepository;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointments;
    @Autowired
    private InterventionRepository interventionRepository;

    public void delete(Long id) {
        appointments.deleteById(id);
    }

    public void save(Appointment appointment) {
        this.appointments.save(appointment);
    }

    public List<Appointment> findAll() {
        return appointments.findAll();
    }

    public Optional<Appointment> findById(Long id) {
        return appointments.findById(id);
    }

    public List<Appointment> findByUserId(Long userId) {
        return appointments.findByUserId(userId);
    }

    public void deleteAll(List<Appointment> appointmentList) {
        appointments.deleteAll(appointmentList);
    }

    public List<Appointment> getAllAppointmentsByUserId(Long id) {
        return appointments.getAllAppointmentsByUserId(id);
    }

    public Appointment getAppointmentByInterventionId(Long interventionId) {
        Optional<Intervention> interventionOptional = interventionRepository.findById(interventionId);

        if (interventionOptional.isPresent()) {
            Intervention intervention = interventionOptional.get();
            return intervention.getAppointment();
        } else {
            // Manejar el caso en el que la Intervention con el ID dado no existe
            return null;
        }
    }

    public List<Appointment> findAppointmentsByUserDetails(String name, String lastName, String username) {
        return appointments.findByUser_NameContainingOrUser_LastNameContainingOrUser_UsernameContaining(name, lastName, username);
    }
    
    public boolean isAppointmentAvailable(LocalDate bookDate, LocalTime fromDate, LocalTime toDate) {
        return !appointments.existsByBookDateAndFromDateLessThanEqualAndToDateGreaterThanEqual(bookDate, fromDate, toDate);
    }     

    public List<Appointment> getAllAppointmentsByCodEntity(Long codEntity){
        return appointments.getAllAppointmentsByCodEntity(codEntity);
    }

    public List<Appointment> findAllAppointmentsByDoctorAsignatedId(Long doctorAsignatedId){
        return appointments.findAllAppointmentsByDoctorAsignatedId(doctorAsignatedId);
    }
}
