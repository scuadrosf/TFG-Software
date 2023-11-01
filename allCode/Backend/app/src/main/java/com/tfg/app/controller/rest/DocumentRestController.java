package com.tfg.app.controller.rest;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tfg.app.repository.DocumentRepository;
import com.tfg.app.service.DocumentService;

@RestController
@RequestMapping("/api/documents")
public class DocumentRestController {
    
    @Autowired
    private DocumentService documentService;
    @Autowired
    private DocumentRepository documentRepository;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadDocument(@RequestParam("file") MultipartFile file) throws IOException {
        try {
            // Verificar si el archivo está vacío
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Por favor, seleccione un archivo.");
            }

            // Guardar el documento en el repositorio
            documentService.saveDocument(file);

            return ResponseEntity.ok("Documento subido exitosamente");
        } catch (IOException e) {
            // Manejar errores de IO, por ejemplo, si no se puede leer/escribir el archivo
            return ResponseEntity.status(500).body("Error al subir el documento: " + e.getMessage());
        }
    }

   @GetMapping("/{id}")
    public ResponseEntity<byte[]> getDocument(@PathVariable Long id) throws IOException, NotFoundException {
        // Recupera el documento por su ID desde el servicio
        byte[] documentContent = documentService.getDocumentContentById(id);

        // Configura los encabezados de la respuesta para el tipo de contenido y el tamaño del documento
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentLength(documentContent.length);

        // Devuelve el contenido del documento en la respuesta
        return new ResponseEntity<>(documentContent, headers, HttpStatus.OK);
    }
}
