package tn.tili.code4hope.services;

import org.springframework.stereotype.Service;
import tn.tili.code4hope.entities.Document;
import tn.tili.code4hope.repository.DocumentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {

    private final DocumentRepository repository;

    public DocumentService(DocumentRepository repository) {
        this.repository = repository;
    }

    // ===== GET =====
    public List<Document> getAllDocuments() {
        return repository.findAll();
    }

    public List<Document> getDocumentsByType(String type) {
        return repository.findByType(type);
    }

    public Document getDocumentById(String id) {
        Optional<Document> doc = repository.findById(id);
        return doc.orElse(null);
    }

    // ===== POST =====
    public Document saveDocument(Document doc) {
        return repository.save(doc);
    }

    // ===== PUT =====
    public Document updateDocument(String id, Document doc) {
        Optional<Document> existing = repository.findById(id);
        if (existing.isPresent()) {
            Document d = existing.get();
            d.setTitre(doc.getTitre());
            d.setDescription(doc.getDescription());
            d.setType(doc.getType());
            d.setCheminFichier(doc.getCheminFichier());
            d.setActif(doc.isActif());
            return repository.save(d);
        }
        return null;
    }

    // ===== DELETE =====
    public void deleteDocument(String id) {
        repository.deleteById(id);
    }
}
