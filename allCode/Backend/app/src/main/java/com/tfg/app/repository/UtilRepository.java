package com.tfg.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.tfg.app.model.Util;

public interface UtilRepository extends JpaRepository<Util, Long> {

    @Query("SELECT u.appointmentsCompletedYesterday FROM utilTable u")
    int getAppointmentsCompletedYesterday();

    @Query("SELECT u.numPatientsYesterday FROM utilTable u")
    int getNumPatientsYesterday();

    @Query("SELECT u.numPatientsTotal FROM utilTable u")
    int getNumPatientsTotal();

    @Query(value = "SELECT num_patients_total FROM util_table WHERE id = ?1", nativeQuery = true)
    int findNumPatientsTotalById(Long id);
}
