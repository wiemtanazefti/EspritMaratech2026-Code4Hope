package tn.tili.code4hope.controller;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tn.tili.code4hope.entities.RolesEnum;
import tn.tili.code4hope.entities.Utilisateurs;
import tn.tili.code4hope.repository.UtilisateurRepository;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/Code4Hope/test")
@CrossOrigin(origins = "http://localhost:4200")
public class TestController {

    private final UtilisateurRepository repo;
    private final BCryptPasswordEncoder passwordEncoder;

    public TestController(UtilisateurRepository repo, BCryptPasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    // Crée un user statique au démarrage
    @EventListener(ApplicationReadyEvent.class)
    public void createStaticUser() {
        if (repo.findByEmail("tiliassociation@gmail.com").isEmpty()) {
            Utilisateurs user = new Utilisateurs();
            user.setEmail("tiliassociation@gmail.com");
            user.setNom("Tili");
            user.setPrenom("Association");
            user.setMotDePasse(passwordEncoder.encode("tili1@association"));
            user.setActif(true);
            user.setRole(RolesEnum.CONSULTANT_MEMBRE);

            repo.save(user);
            System.out.println("Utilisateur statique créé au démarrage avec email tiliassociation@gmail.com et mot de passe 'tili1@association'");
        }
    }

    @GetMapping("/get-static-user")
    public Map<String, Object> getStaticUser() {
        Utilisateurs user = repo.findByEmail("tiliassociation@gmail.com").orElse(null);
        Map<String, Object> result = new HashMap<>();
        result.put("user", user);
        return result;
    }
}
