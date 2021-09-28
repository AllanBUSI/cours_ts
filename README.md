# Homeslash API

## Prérequis 🔧

- Node 14.x.x
- NPM / Yarn
- tsc
- pm2

## Installation 🔄

```
git clone <projet>
```

```
cd <projet>
```

Editer un fichier `.env` à la racine du projet.

```
NODE_ENV=
JWT_SECRET_PUBLIC=
PORT=

EMAIL_USER=
EMAIL_PASSWORD=

## TYPEORM CONFIG
TYPEORM_CONNECTION=
TYPEORM_HOST=
TYPEORM_USERNAME=
TYPEORM_PASSWORD=
TYPEORM_DATABASE=
TYPEORM_PORT=
TYPEORM_ENTITIES=
TYPEORM_MIGRATIONS=
TYPEORM_ENTITIES_DIR=
TYPEORM_MIGRATIONS_DIR=

## GEOCODER
GEOCODER_API_KEY=

## URL SITE
SITE_URL=

# Config courriel
SMTP_HOST=
SMTP_PORT=
```

### Installation des dépendances

```
npm install
```

### Transcription du TypeScript en JavaScript

```
npm run build
```

## Lancement 🚀

```
npm start
```

mise a jour
