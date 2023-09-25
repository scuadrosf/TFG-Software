package com.tfg.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.app.model.Intervention;

public interface InterventionRepository extends JpaRepository<Intervention, Long>{
    
}
