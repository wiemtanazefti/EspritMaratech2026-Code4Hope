package tn.tili.code4hope.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "utilisateurs")
public class Utilisateurs {

    @Id
    private String idUser;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private boolean actif = true;
    private Date dateCreation = new Date();
    private RolesEnum role;

    // ===== Getters & Setters =====
    public String getIdUser() { return idUser; }
    public void setIdUser(String idUser) { this.idUser = idUser; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMotDePasse() { return motDePasse; }
    public void setMotDePasse(String motDePasse) { this.motDePasse = motDePasse; }

    public boolean isActif() { return actif; }
    public void setActif(boolean actif) { this.actif = actif; }

    public Date getDateCreation() { return dateCreation; }
    public void setDateCreation(Date dateCreation) { this.dateCreation = dateCreation; }

    public RolesEnum getRole() { return role; }
    public void setRole(RolesEnum role) { this.role = role; }
}
