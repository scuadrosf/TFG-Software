package com.tfg.app.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.tfg.app.model.Document;
import com.tfg.app.model.Intervention;
import com.tfg.app.repository.DocumentRepository;

@Service
public class DocumentService {
    
    @Autowired
    private DocumentRepository documents;

    @Autowired
    private InterventionService interventionService;

    public void delete(Long id) {
        documents.deleteById(id);
    }

    public void save(Document document) {
        this.documents.save(document);
    }

    public List<Document> findAll() {
        return documents.findAll();
    }

    public Optional<Document> findById(Long id) {
        return documents.findById(id);
    }

    public void saveDocument(MultipartFile file, Long id) throws IOException {
        byte[] content = file.getBytes();

        Document document = new Document();
        document.setFileName(file.getOriginalFilename());
        document.setCreationDate(LocalDate.now());
        document.setFile(content);
        Intervention intervention = interventionService.findById(id).get();
        if (intervention != null)
            document.setIntervention(intervention);

        documents.save(document);
    }

    public byte[] getDocumentContentById(Long id) throws IOException, NotFoundException {
        // Recupera el documento por su ID desde el repositorio
        Optional<Document> documentOptional = documents.findById(id);

        if (documentOptional.isPresent()) {
            Document document = documentOptional.get();
            // Devuelve el contenido del documento como un array de bytes
            return document.getFile();
        } else {
            throw new NotFoundException();
        }
    }
    
}
