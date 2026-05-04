const resetForm = document.getElementById('reset-form');

if (resetForm) {
    resetForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            showToast('Les mots de passe ne correspondent pas !', 'error');
            return;
        }

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
                showToast('Mot de passe réinitialisé avec succès !', 'success');
                setTimeout(() => {
                    window.location.href = 'connexion.html';
                }, 1000);
            } else {
                showToast(data.message || 'Token invalide ou expiré !', 'error');
            }

        } catch (err) {
            console.error('Erreur:', err);
            showToast('Erreur lors de la réinitialisation !', 'error');
        }
    });
}