package com.tfg.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.app.controller.DTOS.InterventionDTO;
import com.tfg.app.model.Intervention;

public interface InterventionRepository extends JpaRepository<Intervention, Long>{

    void save(InterventionDTO responseDTO);

    List<Intervention> findByUserId(Long userId);
    
}
