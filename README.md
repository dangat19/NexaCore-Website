# NexaCore Solutions Corporate Website

A responsive corporate website for NexaCore Solutions, a technology company offering web development, mobile apps, networking, and cybersecurity services.

## Project Structure

```text
NexaCore-Website/
|-- FRONTEND/
|   |-- assets/
|   |   |-- css/
|   |   |-- js/
|   |   `-- images/
|   |-- index.html
|   |-- about.html
|   |-- services.html
|   |-- projects.html
|   |-- gallery.html
|   |-- faq.html
|   |-- contact.html
|   |-- signin.html
|   `-- signup.html
|-- BACKEND/
|   |-- server.js
|   |-- setup.sql
|   `-- package.json
|-- package.json
`-- README.md
```

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5500`.

## Notes

- Static site files live in `FRONTEND/`.
- Shared styles, scripts, and images live in `FRONTEND/assets/`.
- Firebase authentication config is loaded from `FRONTEND/assets/js/firebase-config.js`.
- `BACKEND/` is reserved for server/API work when the backend is implemented.
