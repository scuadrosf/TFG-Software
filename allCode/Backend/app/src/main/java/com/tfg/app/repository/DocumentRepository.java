package com.tfg.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.app.model.Document;

public interface DocumentRepository extends JpaRepository<Document, Long>{
    
    List<Document> findByInterventionId(Long interventionId);
}
