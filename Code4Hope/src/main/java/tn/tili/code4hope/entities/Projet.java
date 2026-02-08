package tn.tili.code4hope.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "projets")
public class Projet {

    @Id
    private String id;

    private String titre;
    private String description;
    private String chefProjet; // champ ajouté pour le repository
    private String utilisateurId;
    private StatutProjetEnum statut;

    // ===== Getters & Setters =====
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getChefProjet() { return chefProjet; }
    public void setChefProjet(String chefProjet) { this.chefProjet = chefProjet; }

    public String getUtilisateurId() { return utilisateurId; }
    public void setUtilisateurId(String utilisateurId) { this.utilisateurId = utilisateurId; }

    public StatutProjetEnum getStatut() { return statut; }
    public void setStatut(StatutProjetEnum statut) { this.statut = statut; }
}
