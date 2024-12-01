const express = require('express');
const path = require('path');

const app = express();

// Middleware pour vérifier les heures de travail
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 pour dimanche, 1 pour lundi...
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Continue si dans les heures de travail
  } else {
    res.send('<h1>Le site est accessible uniquement du lundi au vendredi, de 9h à 17h.</h1>');
  }
};

// Appliquer le middleware globalement
app.use(checkWorkingHours);

// Configurer le moteur de vues (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Accueil', message: 'Bienvenue sur notre page d\'accueil !' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'Nos Services', message: 'Voici nos services.' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Nous Contacter', message: 'Contactez-nous à contact@notresite.com' });
});

// Démarrer le serveur
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
