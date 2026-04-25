const resetForm = document.getElementById('reset-form');

if (resetForm) {
    resetForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas !');
            return;
        }

        // Récupérer le token dans l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        try {
            const response = await fetch('https://red-product-backend-mkzn.onrender.com/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, mot_de_passe: newPassword })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Mot de passe réinitialisé avec succès !');
                window.location.href = 'connexion.html';
            } else {
                alert(data.message);
            }

        } catch (err) {
            console.error('Erreur:', err);
            alert('Erreur lors de la réinitialisation !');
        }
    });
}