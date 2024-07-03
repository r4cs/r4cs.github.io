function showPopup(s) {
    const popup = document.getElementById(s);
    const overlay = document.getElementById('overlay');
    popup.style.display = 'flex';
    overlay.style.display = 'block';
}

function closePopup(s) {
    const popup = document.getElementById(s);
    const overlay = document.getElementById('overlay');
    popup.style.display = 'none';
    overlay.style.display = 'none';
}