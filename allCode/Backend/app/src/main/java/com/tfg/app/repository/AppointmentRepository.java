package com.tfg.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.app.model.Appointment;
import com.tfg.app.model.User;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
    List<Appointment> findByUserId(Long userId);
}
