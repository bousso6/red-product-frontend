const oublieForm = document.getElementById('oublie-form');

if (oublieForm) {
    oublieForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('oublie-email').value;

        try {
            const response = await fetch('https://red-product-backend-mkzn.onrender.com/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Email envoyé ! Vérifiez votre boîte mail 😊');
            } else {
                alert(data.message);
            }

        } catch (err) {
            console.error('Erreur:', err);
            alert('Erreur lors de l\'envoi !');
        }
    });
}


const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 60000); // 60 secondes

try {
    const response = await fetch('https://red-product-backend-mkzn.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        signal: controller.signal
    });
    clearTimeout(timeout);
    // ... reste du code
} catch (err) {
    if (err.name === 'AbortError') {
        alert('Le serveur met du temps à répondre, réessayez dans quelques secondes !');
    } else {
        alert('Erreur lors de l\'envoi !');
    }
}