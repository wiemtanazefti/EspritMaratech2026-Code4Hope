package tn.tili.code4hope.entities;

import org.springframework.data.annotation.Id;

import java.util.Date;

@org.springframework.data.mongodb.core.mapping.Document(collection = "documents")
public class Document { // <-- Renommer ici
    @Id
    private String id;
    private String titre;
    private String description;
    private String type; // rapports, comptes rendus, administratifs, projets
    private Date dateCreation = new Date();
    private String cheminFichier;
    private boolean actif = true;

    // ===== Getters & Setters =====
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Date getDateCreation() { return dateCreation; }
    public void setDateCreation(Date dateCreation) { this.dateCreation = dateCreation; }

    public String getCheminFichier() { return cheminFichier; }
    public void setCheminFichier(String cheminFichier) { this.cheminFichier = cheminFichier; }

    public boolean isActif() { return actif; }
    public void setActif(boolean actif) { this.actif = actif; }
}
