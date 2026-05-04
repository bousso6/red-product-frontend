// Vérifier si l'utilisateur est connecté
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'connexion.html';
}

// Afficher le nom de l'utilisateur
const nom = localStorage.getItem('nom');
const nomUser = document.getElementById('nom-user');
if (nomUser && nom) {
    nomUser.textContent = nom;
}

// Déconnexion
const btnDeconnexion = document.querySelector('.fa-arrow-right-from-bracket');
if (btnDeconnexion) {
    btnDeconnexion.parentElement.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('nom');
        window.location.href = 'connexion.html';
    });
}

// ==========================================
// 1. GESTION DE LA MODALE & MENU
// ==========================================
const modalBtn = document.querySelector('.modal-btn');
const overlay = document.querySelector('.modal-overlay');
const closeModal = document.querySelector('.close-modal');

if (modalBtn && overlay && closeModal) {
    modalBtn.addEventListener('click', () => overlay.classList.remove('hidden'));
    closeModal.addEventListener('click', () => overlay.classList.add('hidden'));
}

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menu-label');
    const slide = document.querySelector('.slide');
    if (toggle && slide) {
        toggle.addEventListener('click', () => {
            slide.style.display = (slide.style.display === 'block') ? 'none' : 'block';
        });
    }
    setTimeout(() => {
        chargerHotels();
        chargerNotifications();
        localStorage.removeItem('notif-seen');
    }, 100);
});

// ==========================================
// 2. ENVOI DU FORMULAIRE (AVEC IMAGE)
// ==========================================
const form = document.getElementById('hotel-form') || document.querySelector('form');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nom', document.getElementById('nom').value);
        formData.append('adresse', document.getElementById('adresse').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('telephone', document.getElementById('telephone').value);
        formData.append('prix', document.getElementById('prix').value);
        formData.append('devise', document.getElementById('devise').value);

        const photoInput = document.getElementById('photo-input');
        if (photoInput && photoInput.files[0]) {
            formData.append('photo', photoInput.files[0]);
        }

        try {
            const response = await fetch('https://red-product-backend-mkzn.onrender.com/api/hotels', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Erreur lors de la création');

            showToast('Hôtel créé avec succès !', 'success');
            form.reset();
            overlay.classList.add('hidden');
            chargerHotels();

        } catch (err) {
            console.error('Erreur:', err);
            showToast('Impossible d\'enregistrer l\'hôtel !', 'error');
        }
    });
}

// ==========================================
// 3. RÉCUPÉRATION ET AFFICHAGE DES CARTES
// ==========================================
async function chargerHotels() {
    try {
        const response = await fetch('https://red-product-backend-mkzn.onrender.com/api/hotels');
        const hotels = await response.json();
        const listeHotels = document.querySelector('.hotel-list');

        if (listeHotels) {
            listeHotels.innerHTML = '';
            // Inverser pour afficher les plus récents en premier
            const hotelsInverses = [...hotels].reverse();
            hotelsInverses.forEach(hotel => {
                const imageSrc = !hotel.photo || hotel.photo === ''
                    ? 'images/image.png'
                    : hotel.photo.startsWith('http')
                        ? hotel.photo
                        : `https://red-product-backend-mkzn.onrender.com/${hotel.photo}`;

                listeHotels.innerHTML += `
                    <div onclick="voirDetail(${JSON.stringify(hotel).replace(/"/g, '&quot;')})" 
                        class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                        <img src="${imageSrc}" class="w-full h-48 object-cover" 
                            onerror="this.src='images/image.png'">
                        <div class="p-4">
                            <p class="text-xs text-pink-500 font-semibold mb-1">${hotel.adresse}</p>
                            <h3 class="font-bold text-xl text-gray-800 mb-2">${hotel.nom}</h3>
                            <span class="text-gray-900 font-bold">${hotel.prix} ${hotel.devise} / nuit</span>
                        </div>
                    </div>
                `;
            });
        }
    } catch (err) {
        console.error('Erreur chargement:', err);
    }
}

// ==========================================
// 4. VOIR DÉTAILS
// ==========================================
function voirDetail(hotel) {
    const imageSrc = !hotel.photo || hotel.photo === ''
        ? 'images/image.png'
        : hotel.photo.startsWith('http')
            ? hotel.photo
            : `https://red-product-backend-mkzn.onrender.com/${hotel.photo}`;

    document.getElementById('detail-nom').textContent = hotel.nom;
    document.getElementById('detail-photo').src = imageSrc;
    document.getElementById('detail-adresse').textContent = hotel.adresse;
    document.getElementById('detail-email').textContent = hotel.email;
    document.getElementById('detail-telephone').textContent = hotel.telephone;
    document.getElementById('detail-prix').textContent = hotel.prix;
    document.getElementById('detail-devise').textContent = hotel.devise;

    document.getElementById('detail-overlay').classList.remove('hidden');
}

function fermerDetail() {
    document.getElementById('detail-overlay').classList.add('hidden');
}

// ==========================================
// 5. SUPPRIMER UN HÔTEL
// ==========================================
async function supprimerHotel(id) {
    if (confirm('Voulez-vous supprimer cet hôtel ?')) {
        try {
            await fetch(`https://red-product-backend-mkzn.onrender.com/api/hotels/${id}`, {
                method: 'DELETE'
            });
            showToast('Hôtel supprimé !', 'success');
            chargerHotels();
        } catch (err) {
            console.error('Erreur:', err);
            showToast('Erreur lors de la suppression !', 'error');
        }
    }
}

// ==========================================
// 6. MODIFIER UN HÔTEL
// ==========================================
async function modifierHotel(id) {
    const nom = prompt('Nouveau nom :');
    const prix = prompt('Nouveau prix :');

    try {
        await fetch(`https://red-product-backend-mkzn.onrender.com/api/hotels/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, prix })
        });
        showToast('Hôtel modifié !', 'success');
        chargerHotels();
    } catch (err) {
        console.error('Erreur:', err);
        showToast('Erreur lors de la modification !', 'error');
    }
}

// ==========================================
// 7. RECHERCHE
// ==========================================
const searchInput = document.querySelector('input[placeholder="Rechercher..."]');

if (searchInput) {
    searchInput.addEventListener('input', async (e) => {
        const recherche = e.target.value.toLowerCase();

        try {
            const response = await fetch('https://red-product-backend-mkzn.onrender.com/api/hotels');
            const hotels = await response.json();

            const hotelsFiltres = [...hotels].reverse().filter(hotel =>
                hotel.nom.toLowerCase().includes(recherche) ||
                hotel.adresse.toLowerCase().includes(recherche)
            );

            const listeHotels = document.querySelector('.hotel-list');
            listeHotels.innerHTML = '';

            if (hotelsFiltres.length === 0) {
                listeHotels.innerHTML = '<p class="text-gray-500 p-4">Aucun hôtel trouvé</p>';
                return;
            }

            hotelsFiltres.forEach(hotel => {
                const imageSrc = !hotel.photo || hotel.photo === ''
                    ? 'images/image.png'
                    : hotel.photo.startsWith('http')
                        ? hotel.photo
                        : `https://red-product-backend-mkzn.onrender.com/${hotel.photo}`;

                listeHotels.innerHTML += `
                    <div onclick="voirDetail(${JSON.stringify(hotel).replace(/"/g, '&quot;')})" 
                        class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                        <img src="${imageSrc}" class="w-full h-48 object-cover" onerror="this.src='images/image.png'">
                        <div class="p-4">
                            <p class="text-xs text-pink-500 font-semibold mb-1">${hotel.adresse}</p>
                            <h3 class="font-bold text-xl text-gray-800 mb-2">${hotel.nom}</h3>
                            <span class="text-gray-900 font-bold">${hotel.prix} ${hotel.devise} / nuit</span>
                        </div>
                    </div>
                `;
            });
        } catch (err) {
            console.error('Erreur:', err);
        }
    });
}

// ==========================================
// 8. NOTIFICATIONS
// ==========================================
function toggleNotifications() {
    const dropdown = document.getElementById('notif-dropdown');
    dropdown.classList.toggle('hidden');
    document.getElementById('notif-count').classList.add('hidden');
    localStorage.setItem('notif-seen', 'true');
}

async function chargerNotifications() {
    try {
        const response = await fetch('https://red-product-backend-mkzn.onrender.com/api/hotels');
        const hotels = await response.json();

        const notifList = document.getElementById('notif-list');
        const notifCount = document.getElementById('notif-count');

        if (hotels.length === 0) {
            notifList.innerHTML = '<p class="text-gray-400 text-sm text-center p-4">Aucune notification</p>';
            return;
        }

        const derniersHotels = [...hotels].reverse().slice(0, 5);
        const seen = localStorage.getItem('notif-seen');

        if (!seen) {
            notifCount.textContent = derniersHotels.length;
            notifCount.classList.remove('hidden');
        }

        notifList.innerHTML = '';
        derniersHotels.forEach(hotel => {
            const date = new Date(hotel.createdAt).toLocaleDateString('fr-FR');
            notifList.innerHTML += `
                <div class="flex items-center gap-3 px-4 py-3 border-b hover:bg-gray-50 cursor-pointer">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <i class="fa-solid fa-hotel text-gray-500 text-xs"></i>
                    </div>
                    <div>
                        <p class="text-sm font-semibold">${hotel.nom}</p>
                        <p class="text-xs text-gray-400">Ajouté le ${date}</p>
                    </div>
                </div>
            `;
        });

    } catch (err) {
        console.error('Erreur notifications:', err);
    }
}

// ==========================================
// 9. PHOTO DE PROFIL
// ==========================================
const savedPhoto = localStorage.getItem('photo');
const profilImg = document.getElementById('profil-img');
if (savedPhoto && profilImg) profilImg.src = savedPhoto;