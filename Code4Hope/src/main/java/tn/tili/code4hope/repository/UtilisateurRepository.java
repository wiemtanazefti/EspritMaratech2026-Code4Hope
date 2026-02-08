package tn.tili.code4hope.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.tili.code4hope.entities.Utilisateurs;

import java.util.Optional;

public interface UtilisateurRepository
        extends MongoRepository<Utilisateurs, String> {

    Optional<Utilisateurs> findByEmail(String email);
}
