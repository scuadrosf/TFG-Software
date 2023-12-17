package com.tfg.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.app.model.Document;

public interface DocumentRepository extends JpaRepository<Document, Long>{
    
    Optional<Document> findByInterventionId(Long interventionId);
    List<Document> getAllDocumentsByUserId(Long userId);
    
}
