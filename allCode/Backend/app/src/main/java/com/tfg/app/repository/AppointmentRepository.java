package com.tfg.app.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tfg.app.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
        List<Appointment> findByUserId(Long userId);

        List<Appointment> getAllAppointmentsByUserId(Long userId);

        List<Appointment> findByUser_NameContainingOrUser_LastNameContainingOrUser_UsernameContaining(String name,
                        String lastName, String username);

        boolean existsByBookDateAndFromDateLessThanEqualAndToDateGreaterThanEqual(
                        LocalDate bookDate, LocalTime fromTime, LocalTime toTime);
        List<Appointment> getAllAppointmentsByCodEntity(Long codEntity);
}
