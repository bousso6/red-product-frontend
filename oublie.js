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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            btnEnvoyer.textContent = 'Email envoyé ✅';
            showToast('Email envoyé ! Vérifiez votre boîte mail 😊', 'success');

        } catch (err) {
            console.error('Erreur:', err);
            btnEnvoyer.disabled = false;
            btnEnvoyer.textContent = 'Envoyer';
            showToast('Erreur lors de l\'envoi !', 'error');
        }
    });
}