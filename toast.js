function showToast(message, type = 'success') {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6',
        stopOnFocus: true,
    }).showToast();
}