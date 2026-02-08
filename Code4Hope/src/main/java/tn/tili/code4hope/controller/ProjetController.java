package tn.tili.code4hope.controller;

import org.springframework.web.bind.annotation.*;

import tn.tili.code4hope.entities.Projet;
import tn.tili.code4hope.services.ProjetService;

import java.util.List;

@RestController
@RequestMapping("/projets")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjetController {

    private final ProjetService projetService;

    public ProjetController(ProjetService projetService) {
        this.projetService = projetService;
    }

    @PostMapping("/creer")
    public Projet creerProjet(@RequestBody Projet projet, @RequestParam(required = false, defaultValue = "") String chefProjet) {
        return projetService.creerProjet(projet, chefProjet != null ? chefProjet : "");
    }

    @PutMapping("/modifier/{id}")
    public Projet modifierProjet(@PathVariable String id, @RequestBody Projet projet, @RequestParam(required = false, defaultValue = "") String chefProjet) {
        return projetService.modifierProjet(id, projet, chefProjet != null ? chefProjet : "");
    }

    @PutMapping("/changerStatut/{id}")
    public Projet changerStatut(@PathVariable String id, @RequestParam String statut, @RequestParam(required = false, defaultValue = "") String utilisateurId) {
        return projetService.changerStatut(id, statut, utilisateurId != null ? utilisateurId : "");
    }

    @GetMapping("/liste")
    public List<Projet> listeProjets() {
        return projetService.listeProjets();
    }

    @GetMapping("/{id}")
    public Projet getProjetById(@PathVariable String id) {
        return projetService.getProjetById(id);
    }

    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable String id) {
        projetService.supprimerProjet(id);
    }
}
