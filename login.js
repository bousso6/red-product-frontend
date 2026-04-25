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
                // Sauvegarder le token
                localStorage.setItem('token', data.token);
                localStorage.setItem('nom', data.nom);
                // Rediriger vers la page principale
                window.location.href = 'index.html';
            } else {
                alert(data.message);
            }

        } catch (err) {
            console.error('Erreur:', err);
            alert('Erreur de connexion !');
        }
    });
}