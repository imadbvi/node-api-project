# Node.js Express API Project

## Beschrijving
Dit project is een REST API gebouwd met Node.js en Express. Het bevat functionaliteiten voor het beheren van gebruikers (`Users`) en nieuwsartikelen (`NewsPosts`), inclusief volledige CRUD-operaties, validatie, sorteren, paginering en zoeken. De database is gebaseerd op SQLite.

## Installatie & Setup

1. **Clone de repository**
   ```bash
   git clone https://github.com/imadbvi/node-api-project.git
   cd node-api-project
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   ```

3. **Start de server**
   - Voor development (met auto-reload):
     ```bash
     npm run dev
     ```
   - Voor productie:
     ```bash
     npm start
     ```

De server draait standaard op `http://localhost:3000`.
Bij het opstarten wordt automatisch een `database.sqlite` bestand aangemaakt en gevuld met testdata indien deze nog niet bestaat.

## API Documentatie
Bezoek de root (`/`) van de applicatie in je browser (b.v. `http://localhost:3000`) voor een overzicht van alle endpoints.

### Belangrijkste Endpoints

#### Users
- `GET /api/users`: Lijst ophalen (params: limit, offset, search, sort)
- `GET /api/users/:id`: Detail
- `POST /api/users`: Aanmaken (body: name, email, phone)
- `PUT /api/users/:id`: Updaten
- `DELETE /api/users/:id`: Verwijderen

#### News
- `GET /api/news`: Lijst ophalen
- `POST /api/news`: Aanmaken (body: title, content, user_id)
- ... (zie / voor volledig overzicht)


## Bronvermelding
- **Express Documentatie**: https://expressjs.com/
- **SQLite**: https://www.sqlite.org/index.html
- **Better-Sqlite3 Wrapper**: https://github.com/WiseLibs/better-sqlite3

### Nuttige Tutorials & Video's
- **YouTube - Traversy Media**: [Node.js & Express Crash Course](https://www.youtube.com/watch?v=fBNz5xF-Kx4)
  *Gebruikt voor de basisstructuur en het opzetten van de server.*
- **YouTube - Web Dev Simplified**: [Express Middleware Explained](https://www.youtube.com/watch?v=lY6icfhap2o)
  *Hulp bij het begrijpen en implementeren van validatie middleware.*
- **MDN Web Docs**: [Express Tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
  *Algemene referentie voor best practices en routing.*
- **ChatGPT (OpenAI)**:
  *Gebruikt voor hulp bij het oplossen van specifieke bugs en uitleg van foutmeldingen.*

## Features
- ✅ CRUD voor Users & News
- ✅ Paginering (Limit & Offset)
- ✅ Zoeken & Sorteren
- ✅ Geavanceerde validatie (Telefoonnummers)
- ✅ Centrale Error Handling
