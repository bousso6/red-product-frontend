const oublieForm = document.getElementById('oublie-form');
const btnEnvoyer = oublieForm ? oublieForm.querySelector('button') : null;

if (oublieForm) {
    oublieForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('oublie-email').value;

        btnEnvoyer.disabled = true;
        btnEnvoyer.textContent = 'Envoi en cours...';

        try {
            const response = await fetch('https://red-product-backend-mkzn.onrender.com/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            // 👉 Vérifie si la réponse est valide
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const data = await response.json();

            btnEnvoyer.textContent = 'Email envoyé ✅';
            alert('Email envoyé ! Vérifiez votre boîte mail 😊');

        } catch (err) {
            console.error('Erreur:', err);

            btnEnvoyer.disabled = false;
            btnEnvoyer.textContent = 'Envoyer';

            alert('Erreur: ' + err.message);
        }
    });
}