package tn.tili.code4hope.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.tili.code4hope.entities.Projet;
import java.util.List;

public interface ProjetRepository extends MongoRepository<Projet, String> {
    List<Projet> findByChefProjet(String chefProjet);
}
