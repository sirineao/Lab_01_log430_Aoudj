# lab_01_log430_Aoudj - Cash Register App

## Instruction pour lancer le projet

1. Cloner le projet avec le lien https du repo: `git clone https://github.com/sirineao/Lab_01_log430_Aoudj`
2. `cd lab_0_log430_Aoudj`
3. Pour tester l'application console il faut faire `node app.js` et suivre les instructions dans la console pour faire les opération basique de caisse.

## Fonctionnement de la pipeline

La pipeline s'execute a chaque push sur la branche main. Les etapes suivantes sont execute:

1. Lint:  verifie la syntaxe et la qualite du code.
2. Tests unitaires Jest: test le bon fonctionnement du code.
3. Build: construit une image Docker
4. Publication sur Docker Hub

## 1. Introduction et objectifs

Le but de cette application est de fournir une application de type client/serveur à 2 niveaux. Dans laquelle des employés
d'un petit magasin de quartier, peuvent intéragir avec une caisse dans la console et effectuer des opération simples.

## 2. Contraintes

- Langage : JavaScript (Node.js)  
- Persistance : MySQL
- OLM : Sequelize  
- Conteneurisation avec Docker Compose  
- Objectif d’extensibilité : pouvoir ajouter caisses supplémentaires

## 3. Contexte

Il y a 3 caisses, chaque caisse intéragit avec la même base de données. Pour que les données soient persistante.
Il a une cohésion de la gestion du stock.


## 4. Solution conceptuelle

- Architecture à 2 niveaux :  
    - Serveur : base de donnée avec MySQL
    - Client :  Application console.

Dans mon cas j'ai utilisé Squelize pour mon OML, donc j'ai des models pour les tables de données.

- Modèles:
    - Product model, qui représente les produits du magasin.
    - Sale model, qui représente les ventes.
    - Sale Product, qui représente la table qui liées les ventes au produits. Utilisé pour savoir combien de chaque produit dans chaque vente.

- Réseau  Docker Compose (`cash_register_X` et `database`).

## 5. Building block view

## 6. Runtime view

## 7. Deployment view

## 8. Décison d'architecture

- App Node.js (`app.js`) :  
  - Menu interactif (`readline`)  
  - Fonctions pour gérer les simple opérations de la caise (recherche de produit, création de vente, annulation de vente)

- Modèles Sequelize:  
  - Product  
  - Sale  
  - Table de jointure SaleProduct

- Base MySQL :  
  - Tables products, sales, sale_products

- Services Docker Compose :  
  - cash_register_1, cash_register_2, cash_register_3  
  -`shop-db-container (MySQL)

- Volumes Docker :  
  - db_data pour la persistance des données

Architecture du projet:

* app.js                       # Contient les fonctions pour les opération de caisse simple.
* app.test.js                  # Tests unitaires du fichier app
* models                       # Modèles pour sequelize
* populateDB.js                # Fichier pour créer les tables ajouter des produits dans la db.
* package.json                 # Dépendances et scripts npm
* Dockerfile                   # Construction de l'image Docker
* .dockerignore                # Fichiers a ne pas inclure dans le build
* .eslintrc / eslint.config.js # Configuration pour ESLint
* .github/workflows/ci.yml     # Pipeline CI/CD GitHub Actions

## 9. Qualités à atteindre

- Disponibilité : chaque caisse peut accéder à la base de donnée centralisée  
- Extensibilité : pouvoir ajouter des instances de caisses. 
- Intégrité : cohérence des ventes et du stock, persistance des données. 

## 10. Risques techniques

- Extensibilité: limite sur le nombre de caisses qu'on pourrait avoir. (Risque de bottle neck avec trop de requests)




