package com.tfg.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.app.model.Description;

public interface DescriptionRepository extends JpaRepository<Description, Long> {
    
}
