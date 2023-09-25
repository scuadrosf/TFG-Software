package com.tfg.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.app.model.Document;

public interface DocumentRepository extends JpaRepository<Document, Long>{
    
}
