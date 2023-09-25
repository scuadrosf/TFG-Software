package com.tfg.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.app.model.Intervention;
import com.tfg.app.repository.InterventionRepository;

@Service
public class InterventionService {
    
    @Autowired
    private InterventionRepository interventions;

    public void delete(Long id) {
        interventions.deleteById(id);
    }

    public void save(Intervention intervention) {
        interventions.save(this.interventions.save(intervention));
    }

    public List<Intervention> findAll() {
        return interventions.findAll();
    }

    public Optional<Intervention> findById(Long id) {
        return interventions.findById(id);
    }
}
