## TILI – Internal Management Platform

Application Web de gestion interne – Full Stack
#MaraTechEsprit2026

## Présentation de l’association bénéficiaire

Tunisia Inclusive Labor Institute (TILI) est une association engagée dans la promotion du travail inclusif, équitable et durable en Tunisie.

Elle œuvre principalement en faveur :

 - des travailleurs de l’économie informelle,

 - des femmes et des jeunes,

 - des groupes marginalisés.

À travers la recherche, la formation, le plaidoyer et le dialogue social, TILI soutient les réformes du droit du travail et renforce les capacités des acteurs sociaux.

L’association accompagne aujourd’hui plus de 5000 bénéficiaires, avec une équipe d’environ 25 membres et volontaires.

Adresse : 02 Rue Des Omeyyades, Menzah 5, 2091 – Tunisie

Référent projet :

Nom : M. Mohamed Aziz Awadhi

Rôle : Chef de Projet

Contact : awadhiaziz2@gmail.com
 | 51 467 308

## Objectif du projet

Le projet TILI – Internal Management Platform vise à développer une application web de gestion interne permettant à l’association de :

 - Centraliser l’ensemble des documents et rapports,

 - Structurer les projets, réunions et activités,

 - Gérer les accès selon les rôles des membres,

 - Assurer un suivi clair et un historique des actions,

 - Améliorer la collaboration, la transparence et l’efficacité organisationnelle.

La plateforme est conçue pour un usage quotidien, accessible via navigateur web (PC, tablette, smartphone).

## Équipe du projet

Projet réalisé dans le cadre du Hackathon MaraTech 2026 (42 heures).

Membres de l’équipe :

Wiem Tanazefti

Nermine Rahali

Manel Aloui

## Technologies utilisées
Technologies utilisées 
 - Backend
   Spring Boot 3 (Java 17)
   MongoDB
   REST API
   Maven
 - Frontend
   Angular 18
   TypeScript
   HTML / CSS
 - Outils
   Git & GitHub
   Postman

## Architecture du projet
tili/
│── tili-back/     # Backend Spring Boot
│── tili-front/    # Frontend Angular

---

## Prerequisites

| Tool      | Version | Purpose                    |
|-----------|---------|----------------------------|
| **Java**  | 17+     | Backend (Spring Boot)      |
| **Maven** | 3.6+    | Build backend (or use `mvnw`) |
| **Node.js** | 18+  | Frontend (Angular, npm)     |
| **MongoDB** | 4.4+  | Database for backend        |

---

## 1. MongoDB

The backend uses MongoDB on `localhost:27017`.

- **Install**: [MongoDB Community](https://www.mongodb.com/try/download/community) or use Docker:
  ```bash
  docker run -d -p 27017:27017 --name mongo mongo:latest
  ```
- **Check**: MongoDB is running and reachable on `localhost:27017`.

---

## 2. Backend (tili-back)

From the project root:

```bash
cd tili-back
```

- **Windows (PowerShell / CMD):**
  ```bash
  .\mvnw.cmd spring-boot:run
  ```
- **Linux / macOS:**
  ```bash
  ./mvnw spring-boot:run
  ```

Backend runs at: **http://localhost:8080**  
API base path: **http://localhost:8080/api** (e.g. `http://localhost:8080/api/projets`).

Leave this terminal open.

---

## 3. Frontend (tili-front)

Open a **second terminal** and run:

```bash
cd tili-front
npm install
npm start
```

Frontend runs at: **http://localhost:4200**

- First time: `npm install` installs dependencies.
- Later: you can run only `npm start` (or `ng serve`).

---

## 4. Use the application

1. Backend: **http://localhost:8080** (and **http://localhost:8080/api/projets** for projects API).
2. Frontend: **http://localhost:4200**  
   Use the app in the browser; it will call the backend API automatically.

---

## Quick reference

| Step        | Where     | Command                          |
|------------|-----------|-----------------------------------|
| Start DB   | -         | MongoDB on `localhost:27017`      |
| Start back | `tili-back`  | `.\mvnw.cmd spring-boot:run` (Win) / `./mvnw spring-boot:run` (Mac/Linux) |
| Install front | `tili-front` | `npm install`                     |
| Start front | `tili-front` | `npm start`                      |

---

## Optional: build frontend for production

```bash
cd tili-front
npm run build
```

Output is in `tili-front/dist/tili-front/`. You can serve it with any static server or your backend.

---

## Troubleshooting

- **Backend fails to start**  
  - Check MongoDB is running on `localhost:27017`.  
  - Check Java 17: `java -version`.

- **Frontend cannot reach backend**  
  - Backend must be running on port **8080**.  
  - Frontend is configured to use `http://localhost:8080` (see `tili-front/src/environments/environment.ts`).

- **Port already in use**  
  - Backend: change `server.port` in `tili-back/src/main/resources/application.properties`.  
  - Frontend: use `ng serve --port 4201` (and update backend CORS if you use another origin).
