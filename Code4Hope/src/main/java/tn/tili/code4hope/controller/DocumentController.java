package tn.tili.code4hope.controller;

import org.springframework.web.bind.annotation.*;
import tn.tili.code4hope.entities.Document;
import tn.tili.code4hope.services.DocumentService;

import java.util.List;

@RestController
@RequestMapping("/Code4Hope/documents")
@CrossOrigin(origins = "http://localhost:4200")
public class DocumentController {

    private final DocumentService service;

    public DocumentController(DocumentService service) {
        this.service = service;
    }

    // ===== GET =====
    @GetMapping
    public List<Document> getAll() {
        return service.getAllDocuments();
    }

    @GetMapping("/type/{type}")
    public List<Document> getByType(@PathVariable String type) {
        return service.getDocumentsByType(type);
    }

    @GetMapping("/{id}")
    public Document getById(@PathVariable String id) {
        return service.getDocumentById(id);
    }

    // ===== POST =====
    @PostMapping
    public Document create(@RequestBody Document doc) {
        return service.saveDocument(doc);
    }

    // ===== PUT =====
    @PutMapping("/{id}")
    public Document update(@PathVariable String id, @RequestBody Document doc) {
        return service.updateDocument(id, doc);
    }

    // ===== DELETE =====
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.deleteDocument(id);
    }
}
