package tn.tili.code4hope.services;

import tn.tili.code4hope.entities.Projet;
import tn.tili.code4hope.entities.StatutProjetEnum;
import java.util.List;

public interface ProjetService {
    Projet creerProjet(Projet projet, String chefProjet);
    Projet modifierProjet(String id, Projet projet, String chefProjet);
    Projet changerStatut(String idProjet, String statut, String utilisateurId);
    List<Projet> listeProjets();
    Projet getProjetById(String id);
}
