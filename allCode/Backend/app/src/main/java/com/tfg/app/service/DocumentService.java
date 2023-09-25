package com.tfg.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.app.model.Document;
import com.tfg.app.repository.DocumentRepository;

@Service
public class DocumentService {
    
    @Autowired
    private DocumentRepository documents;

    public void delete(Long id) {
        documents.deleteById(id);
    }

    public void save(Document document) {
        documents.save(this.documents.save(document));
    }

    public List<Document> findAll() {
        return documents.findAll();
    }

    public Optional<Document> findById(Long id) {
        return documents.findById(id);
    }
}
