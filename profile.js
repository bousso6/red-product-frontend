// Vérifier si connecté
const token = localStorage.getItem('token');
if (!token) window.location.href = 'connexion.html';

// Afficher les infos
const nom = localStorage.getItem('nom');
const email = localStorage.getItem('email');

document.getElementById('profil-nom').textContent = nom || '';
document.getElementById('profil-email').textContent = email || '';
document.getElementById('input-nom').value = nom || '';
document.getElementById('input-email').value = email || '';

// Changer la photo
const photoInput = document.getElementById('photo-profil-input');
const profilPhoto = document.getElementById('profil-photo');

photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profilPhoto.src = e.target.result;
            localStorage.setItem('photo', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Charger la photo sauvegardée
const savedPhoto = localStorage.getItem('photo');
if (savedPhoto) profilPhoto.src = savedPhoto;