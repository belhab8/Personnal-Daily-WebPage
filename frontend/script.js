window.addEventListener('DOMContentLoaded', (e) => {
    fetch('/data/today.json')
        .then(res => res.json())
        .then(data => {
            document.getElementById('data').textContent = JSON.stringify(data);
        })
        .catch(err => console.error(err));
})