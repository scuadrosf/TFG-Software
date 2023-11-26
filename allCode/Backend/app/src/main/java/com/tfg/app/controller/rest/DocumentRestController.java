package com.tfg.app.controller.rest;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tfg.app.model.Document;
import com.tfg.app.model.Intervention;
import com.tfg.app.model.User;
import com.tfg.app.repository.DocumentRepository;
import com.tfg.app.service.DocumentService;
import com.tfg.app.service.InterventionService;
import com.tfg.app.service.UserService;

@RestController
@RequestMapping("/api/documents")
public class DocumentRestController {

    @Autowired
    private DocumentService documentService;
    @Autowired
    private UserService userService;
    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private InterventionService interventionService;

    @PutMapping("/upload/{documentId}/user={userId}")
    public ResponseEntity<String> uploadDocument(@PathVariable("documentId") Long id,
            @PathVariable("userId") Long userId,
            @RequestParam("file") MultipartFile file) throws IOException {
        try {
            // Verificar si el archivo está vacío
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Por favor, seleccione un archivo.");
            }
            Optional<Intervention> intervention = interventionService.getInterventionByDocumentId(id);
            if (intervention.isPresent()) {
                Document document = documentService.findById(id).get();
                document.setFile(file.getBytes());
                document.setFileName(file.getOriginalFilename());
                document.setCreationDate(LocalDate.now());
                document.setIntervention(intervention.get());
                User user = userService.findById(userId)
                        .orElseThrow(() -> new IllegalArgumentException("Invalid User Id: " + userId));
                document.setUser(user);
                intervention.get().setDocument(document);

                documentService.save(document);
                interventionService.save(intervention.get());

                return ResponseEntity.ok("Documento subido exitosamente");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            // Manejar errores de IO, por ejemplo, si no se puede leer/escribir el archivo
            return ResponseEntity.status(500).body("Error al subir el documento: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getDocument(@PathVariable Long id) throws IOException, NotFoundException {
        // Recupera el documento por su ID desde el servicio
        byte[] documentContent = documentService.getDocumentContentById(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentLength(documentContent.length);

        // Devuelve el contenido del documento en la respuesta
        return new ResponseEntity<>(documentContent, headers, HttpStatus.OK);
    }

    @GetMapping("/full/{id}")
    public ResponseEntity<Document> getEntityDocument(@PathVariable Long id) {
        Optional<Document> optionalDoc = documentRepository.findById(id);
        if (optionalDoc.isPresent()) {
            return ResponseEntity.ok(optionalDoc.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Document>> getAllDocuments() {
        return ResponseEntity.ok().body(documentService.findAll());
    }

    @GetMapping("/{id}/document")
    public ResponseEntity<Document> getDocumentsByInterventionId(@PathVariable Long id) {
        Optional<Document> document = interventionService.getDocumentByInterventionId(id);

        if (document.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(document.get());
    }

    @GetMapping("/all/{id}")
    public ResponseEntity<List<Document>> getAllDocumentByUserId(@PathVariable Long id) {
        if (userService.findById(id).isPresent()) {
            List<Document> documents = documentService.getAllDocumentByUserId(id);
            return ResponseEntity.ok(documents);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable Long id) {
        Optional<Document> documentOptional = documentService.findById(id);
        try {
            if (documentOptional.isPresent()) {
                Intervention interventionOfThisDocument = interventionService.getInterventionByDocumentId(id).get();
                interventionOfThisDocument.setDocument(null);
                interventionService.save(interventionOfThisDocument);
                documentService.delete(id);
            }
            return ResponseEntity.ok("Document eliminado con éxito.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar la intervention: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/intervention")
    public ResponseEntity<Intervention> getInterventionByDocumentId(@PathVariable Long id) {
        Optional<Intervention> optionalIntervention = interventionService.getInterventionByDocumentId(id);
        if (optionalIntervention.isPresent()) {
            return ResponseEntity.ok().body(optionalIntervention.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
