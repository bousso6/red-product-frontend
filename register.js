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
                // Succès
                showToast('Hôtel créé avec succès !', 'success');

                // Erreur
                showToast('Erreur !', 'error');

                // Info
                showToast('Message info', 'info');
                window.location.href = 'connexion.html';
            } else {
                // Succès
                showToast('Hôtel créé avec succès !', 'success');

                // Erreur
                showToast('Erreur !', 'error');

                // Info
                showToast('Message info', 'info');
            }

        } catch (err) {
            console.error('Erreur:', err);
            // Succès
            showToast('Hôtel créé avec succès !', 'success');

            // Erreur
            showToast('Erreur !', 'error');

            // Info
            showToast('Message info', 'info');
        }
    });
}