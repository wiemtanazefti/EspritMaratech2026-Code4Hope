package tn.tili.code4hope.services;

import org.springframework.stereotype.Service;
import tn.tili.code4hope.entities.Projet;
import tn.tili.code4hope.entities.ProjetHistorique;
import tn.tili.code4hope.entities.StatutProjetEnum;
import tn.tili.code4hope.repository.ProjetRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProjetServiceImpl implements ProjetService {

    private final ProjetRepository projetRepository;

    public ProjetServiceImpl(ProjetRepository projetRepository) {
        this.projetRepository = projetRepository;
    }

    @Override
    public Projet creerProjet(Projet projet, String chefProjet) {
        projet.setChefProjet(chefProjet);
        projet.setStatut(StatutProjetEnum.EN_COURS);
        return projetRepository.save(projet);
    }

    @Override
    public Projet modifierProjet(String id, Projet projet, String chefProjet) {
        Optional<Projet> existing = projetRepository.findById(id);
        if (existing.isPresent()) {
            Projet p = existing.get();
            p.setTitre(projet.getTitre());
            p.setDescription(projet.getDescription());
            p.setChefProjet(chefProjet);
            return projetRepository.save(p);
        }
        return null;
    }

    @Override
    public Projet changerStatut(String idProjet, String statut, String utilisateurId) {
        Optional<Projet> existing = projetRepository.findById(idProjet);
        if (existing.isPresent()) {
            Projet p = existing.get();
            p.setStatut(StatutProjetEnum.valueOf(statut));
            return projetRepository.save(p);
        }
        return null;
    }

    @Override
    public List<Projet> listeProjets() {
        return projetRepository.findAll();
    }

    @Override
    public Projet getProjetById(String id) {
        return projetRepository.findById(id).orElse(null);
    }
}
