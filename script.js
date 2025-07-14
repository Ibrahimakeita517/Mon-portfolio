// Année automatique
document.getElementById("annee").innerText = new Date().getFullYear();

// Mode sombre / clair
document.getElementById("toggle-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Formulaire dynamique
const form = document.getElementById("contact-form");
const result = document.getElementById("form-result");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (nom === "" || email === "" || message === "") {
    result.innerText = "Veuillez remplir tous les champs.";
    result.style.color = "red";
    return;
  }

  result.innerText = "Message envoyé avec succès !";
  result.style.color = "green";
  form.reset();
});

// Animation au scroll
const fadeEls = document.querySelectorAll(".fade-in");

function handleScroll() {
  fadeEls.forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 50) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", handleScroll);
handleScroll();
// EFFET "TRAÎNÉE DE SOURIS"
document.addEventListener('DOMContentLoaded', () => {
  const trailer = document.createElement('div');
  trailer.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(253, 255, 253, 1) 0%, rgba(0,150,255,0) 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: transform 0.1s;
  `;
  document.body.appendChild(trailer);

  document.addEventListener('mousemove', e => {
  trailer.style.left = `${e.pageX}px`;
  trailer.style.top = `${e.pageY}px`;
  
  // Interaction avec les éléments cliquables
  const target = e.target.closest('a, button, .btn');
  if (target) {
    trailer.style.width = '40px';
    trailer.style.height = '40px';
    trailer.style.background = 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(0,150,255,0) 70%)';
  } else {
    trailer.style.width = '20px';
    trailer.style.height = '20px';
    trailer.style.background = 'radial-gradient(circle, rgba(0,150,255,0.8) 0%, rgba(0,150,255,0) 70%)';
  }
}); // EFFET "TYPING" POUR LES TITRES
  const titles = document.querySelectorAll('h1, h2');
  titles.forEach(title => {
    const text = title.innerText;
    title.innerText = '';
    
    let i = 0;
    const typing = setInterval(() => {
      title.innerText += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(typing);
        title.classList.add('blink-cursor');
      }
    }, 100);
  });

  // EFFET "PARALLAX 3D"
  document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      
      project.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${y * -10}deg)
      `;
    });
    
    project.addEventListener('mouseleave', () => {
      project.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
  });
});
// ================= EFFETS AVANCÉS =================
// 1. Détection du scroll pour animations
document.addEventListener('DOMContentLoaded', () => {
  // Ajoute la classe "loaded" au body après chargement
  document.body.classList.add('loaded');

  // 2. Effet de vague sur les inputs
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentNode.style.transform = 'scale(1.02)';
      input.style.borderColor = '#08f';
    });
    input.addEventListener('blur', () => {
      input.parentNode.style.transform = 'scale(1)';
      input.style.borderColor = '#ccc';
    });
  });

  // 3. Confetti sur l'envoi du formulaire
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', () => {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, transparent 0%, rgba(0,0,0,0.7) 100%);
        z-index: 9999;
        pointer-events: none;
      `;
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 1000);
    });
  }

  // 4. Effet de lumière dynamique
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    document.body.style.setProperty('--mouse-x', x);
    document.body.style.setProperty('--mouse-y', y);
  });
});
// À ajouter dans votre script.js
document.addEventListener('DOMContentLoaded', () => {
  // Force le mode sombre
  document.body.classList.add('dark-mode');
  
  // Stocke la préférence
  localStorage.setItem('darkMode', 'enabled');
});
