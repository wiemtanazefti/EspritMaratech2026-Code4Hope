package tn.tili.code4hope.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "projet_historique")
public class ProjetHistorique {

    @Id
    private String id;
    private String projetId;
    private String utilisateurId;
    private String action;
    private Date dateAction = new Date();

    // ===== Getters & Setters =====
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getProjetId() { return projetId; }
    public void setProjetId(String projetId) { this.projetId = projetId; }

    public String getUtilisateurId() { return utilisateurId; }
    public void setUtilisateurId(String utilisateurId) { this.utilisateurId = utilisateurId; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public Date getDateAction() { return dateAction; }
    public void setDateAction(Date dateAction) { this.dateAction = dateAction; }
}
