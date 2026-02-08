package tn.tili.code4hope.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.tili.code4hope.entities.ProjetHistorique;
import java.util.List;

public interface ProjetHistoriqueRepository extends MongoRepository<ProjetHistorique, String> {

   // Correct : on utilise le vrai champ "projetId" de ProjetHistorique
   List<ProjetHistorique> findByProjetId(String projetId);
}
