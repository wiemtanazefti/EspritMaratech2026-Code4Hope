package tn.tili.code4hope.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.tili.code4hope.entities.Document;

import java.util.List;

@Repository
public interface DocumentRepository extends MongoRepository<Document, String> {
    List<Document> findByType(String type);
}
