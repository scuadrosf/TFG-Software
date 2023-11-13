package com.tfg.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.app.controller.DTOS.InterventionDTO;
import com.tfg.app.model.Document;
import com.tfg.app.model.Intervention;
import com.tfg.app.repository.DocumentRepository;
import com.tfg.app.repository.InterventionRepository;

@Service
public class InterventionService {
    
    @Autowired
    private InterventionRepository interventions;
    @Autowired
    private DocumentRepository documentRepository;

    public void delete(Long id) {
        interventions.deleteById(id);
    }

    public void save(Intervention intervention) {
        this.interventions.save(intervention);
    }

    public List<Intervention> findAll() {
        return interventions.findAll();
    }

    public Optional<Intervention> findById(Long id) {
        return interventions.findById(id);
    }

    public void save(InterventionDTO responseDTO) {
        this.interventions.save(responseDTO);
    }

    public List<Intervention> findByUserId(Long id) {
        return interventions.findByUserId(id);
    }

    public Optional<Document> getDocumentByInterventionId(Long id){
        return documentRepository.findByInterventionId(id);
    }

}
