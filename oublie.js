const oublieForm = document.getElementById('oublie-form');
const btnEnvoyer = oublieForm ? oublieForm.querySelector('button') : null;

if (oublieForm) {
    oublieForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('oublie-email').value;

        // Désactiver le bouton et changer le texte
        btnEnvoyer.disabled = true;
        btnEnvoyer.textContent = 'Envoi en cours...';

        try {
            const response = await fetch('https://red-product-backend-mkzn.onrender.com/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                btnEnvoyer.textContent = 'Email envoyé ✅';
                alert('Email envoyé ! Vérifiez votre boîte mail 😊');
            } else {
                btnEnvoyer.disabled = false;
                btnEnvoyer.textContent = 'Envoyer';
                alert(data.message);
            }

        } catch (err) {
            console.error('Erreur:', err);
            btnEnvoyer.disabled = false;
            btnEnvoyer.textContent = 'Envoyer';
            alert('Erreur lors de l\'envoi !');
        }
    });
}