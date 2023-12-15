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
}
