/**
 * Oudiamora.net - Script principal (Export Statique LWS)
 * Sans framework, compatible 100% navigateurs modernes.
 */

// Configuration pour le formulaire
const OUDIAMORA_CONFIG = {
  // Optionnel : URL Formspree (ex: "https://formspree.io/f/VOTRE_CODE") ou webhook Make/Zapier
  // Laisser vide pour la démonstration interactive locale
  formEndpoint: "",
};

document.addEventListener('DOMContentLoaded', () => {
  // Gestion du formulaire de communauté
  const form = document.getElementById('community-form');
  const successBox = document.getElementById('community-success');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Inscription en cours...";
      submitBtn.disabled = true;

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Si un endpoint Formspree ou Webhook est configuré
      if (OUDIAMORA_CONFIG.formEndpoint && OUDIAMORA_CONFIG.formEndpoint.trim() !== "") {
        try {
          await fetch(OUDIAMORA_CONFIG.formEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(data)
          });
        } catch (error) {
          console.warn('Envoi vers endpoint échoué, passage en mode local', error);
        }
      } else {
        // Simulation locale 400ms
        await new Promise(r => setTimeout(r, 400));
      }

      // Affichage du message de confirmation
      if (successBox) {
        form.style.display = 'none';
        successBox.style.display = 'block';
      } else {
        alert("Merci " + (data.nom || "") + " ! Votre inscription à la communauté Oudiamora est confirmée.");
        form.reset();
      }

      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  }

  // Filtrage des ressources
  const filterButtons = document.querySelectorAll('[data-filter]');
  const resourceCards = document.querySelectorAll('[data-category]');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.style.backgroundColor = '#F1F5F9';
        b.style.color = '#475569';
      });
      btn.style.backgroundColor = '#0F172A';
      btn.style.color = '#FFFFFF';

      const filter = btn.getAttribute('data-filter');
      resourceCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
