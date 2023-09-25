package com.tfg.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.app.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
    
}
