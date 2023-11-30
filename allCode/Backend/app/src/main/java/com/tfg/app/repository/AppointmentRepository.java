package com.tfg.app.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.app.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
    List<Appointment> findByUserId(Long userId);
    List<Appointment> getAllAppointmentsByUserId(Long userId);

    List<Appointment> findByUser_NameContainingOrUser_LastNameContainingOrUser_UsernameContaining(String name, String lastName, String username);
}
