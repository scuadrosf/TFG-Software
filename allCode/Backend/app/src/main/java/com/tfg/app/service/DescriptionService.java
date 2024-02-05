package com.tfg.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.app.model.Description;
import com.tfg.app.repository.DescriptionRepository;

@Service
public class DescriptionService {
    @Autowired
    private DescriptionRepository descriptionRepository;

    public void save(Description description) {
        this.descriptionRepository.save(description);
    }

    public List<Description> findAll() {
        return descriptionRepository.findAll();
    }

    public Optional<Description> findById(Long id) {
        return descriptionRepository.findById(id);
    }

}
