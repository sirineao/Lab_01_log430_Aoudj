# lab_0_log430_Aoudj - Hello Worl App

## Explication et justification des choix techniques
Cette repo contient un projet simple qui affiche "Hello World!" dans la console. 
Pour ce laboratoire j'ai choisi de faire une application simple avec Node.js.
J'ai choisien JavaScript comme langues puisque c'est laquelle avec je suis la plus a l'aise.
Et donc puisque j'ai pris JS, j'ai utilise Jest pour les tests unitaires.
Pour l'image Docker de base j'ai choisi l'image node:20-alpine qui est une image legere de node comme recommande.

## Architecture de l'application

* app.js                       # Contient la fonction qui print le message et un appel de la fonction est dans le fichier.
* app.test.js                  # Tests unitaires du fichier app
* package.json                 # Dépendances et scripts npm
* Dockerfile                   # Construction de l'image Docker
* .dockerignore                # Fichiers a ne pas inclure dans le build
* .eslintrc / eslint.config.js # Configuration pour ESLint
* .github/workflows/ci.yml     # Pipeline CI/CD GitHub Actions

## Instruction pour lancer le projet

1. Cloner le projet avec le lien https du repo: `git clone https://github.com/sirineao/lab_0_log430_Aoudj`
2. `cd lab_0_log430_Aoudj`
3. Pour construire et lancer le container: `docker compose up ---build`
4. On devrait voir "Hello World!" dans la console.


## Fonctionnement de la pipeline

La pipeline s'execute a chaque push sur la branche main. Les etapes suivantes sont execute:

1. Lint:  verifie la syntaxe et la qualite du code.
2. Tests unitaires Jest: test le bon fonctionnement du code.
3. Build: construit une image Docker
4. Publication sur Docker Hub

## Execution reussie de la pipeline CI/CD

Success de la pipeline
![image](https://cdn.discordapp.com/attachments/691841760871055451/1374596772969709648/image.png?ex=682ea081&is=682d4f01&hm=e14c2458c42f6da9f4daadcae32a86a098ef9559795b66d11b439b33d55be111&)
Image publie sur Docker Hub 
![docker](https://cdn.discordapp.com/attachments/691841760871055451/1374597177468518441/image.png?ex=682ea0e1&is=682d4f61&hm=c079a583968ea7e38c51a89644a3095a9154072576801fe01f2ec1216843cb6a&)
