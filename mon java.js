/*
TOUTE LA LOGIQUE D'AFFICHAGE EST ICI EN JAVASCRIPT
Les sections sont cachées via display:none (CSS)
et affichées UNIQUEMENT par ce script au clic
*/

const openPanels = new Set();

function openSection(id) {
  // Ferme tous les panels déjà ouverts
  openPanels.forEach(otherId => {
    if (otherId !== id) closeSection(otherId);
  });

  const panel = document.getElementById('panel-' + id);
  const card  = document.getElementById('card-'  + id);
  if (!panel) return;

  // Affiche le panel via JS (display:none → display:block)
  panel.classList.add('open');

  // Marque la card comme visitée
  if (card) {
    card.classList.add('unlocked');
    card.querySelector('.card-hint').textContent = 'Déjà visité — cliquer à nouveau';
  }

  openPanels.add(id);

  // Scroll fluide vers le panel
  setTimeout(() => {
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);

  // Anime les barres de compétences si c'est cette section
  if (id === 'competences') {
    setTimeout(animateBars, 200);
  }

  // Synchro navbar
  setActiveNav(id);

  // Ferme le menu mobile si ouvert
  document.getElementById('navLinks').classList.remove('open');
}

function closeSection(id) {
  const panel = document.getElementById('panel-' + id);
  if (!panel) return;

  // Cache le panel via JS (display:block → display:none)
  panel.classList.remove('open');
  openPanels.delete(id);

  // Remet les barres à 0 si on ferme compétences (pour la prochaine ouverture)
  if (id === 'competences') {
    document.querySelectorAll('#panel-competences .skill-bar-fill').forEach(b => {
      b.style.width = '0';
    });
  }
}

function goHome() {
  // Ferme tous les panels ouverts
  openPanels.forEach(id => closeSection(id));
  setActiveNav('accueil');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('navLinks').classList.remove('open');
}

function setActiveNav(sec) {
  document.querySelectorAll('.nav-item').forEach(a => {
    a.classList.toggle('active', a.dataset.sec === sec);
  });
}

function animateBars() {
  document.querySelectorAll('#panel-competences .skill-bar-fill').forEach(bar => {
    bar.style.width = bar.dataset.w + '%';
  });
}

// Hamburger menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});