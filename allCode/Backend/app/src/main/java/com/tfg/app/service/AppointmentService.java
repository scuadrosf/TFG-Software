package com.tfg.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.app.model.Appointment;
import com.tfg.app.repository.AppointmentRepository;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointments;

    public void delete(Long id) {
        appointments.deleteById(id);
    }

    public void save(Appointment appointment) {
        appointments.save(this.appointments.save(appointment));
    }

    public List<Appointment> findAll() {
        return appointments.findAll();
    }

    public Optional<Appointment> findById(Long id) {
        return appointments.findById(id);
    }
}
