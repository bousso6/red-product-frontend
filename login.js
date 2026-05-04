const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('https://red-product-backend-mkzn.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    mot_de_passe: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('nom', data.nom);
                localStorage.setItem('email', email);
                showToast('Connexion réussie !', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showToast(data.message || 'Email ou mot de passe incorrect !', 'error');
            }

        } catch (err) {
            console.error('Erreur:', err);
            showToast('Erreur de connexion !', 'error');
        }
    });
}