const registerForm = document.getElementById('register-form');

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nom = document.getElementById('register-nom').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        try {
            const response = await fetch('https://red-product-backend-mkzn.onrender.com/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nom: nom,
                    email: email,
                    mot_de_passe: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                showToast('Compte créé avec succès !', 'success');
                setTimeout(() => {
                    window.location.href = 'connexion.html';
                }, 1000);
            } else {
                showToast(data.message || 'Erreur lors de l\'inscription !', 'error');
            }

        } catch (err) {
            console.error('Erreur:', err);
            showToast('Erreur lors de l\'inscription !', 'error');
        }
    });
}