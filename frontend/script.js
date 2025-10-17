window.addEventListener('DOMContentLoaded', (e) => {
    fetch('https://fevgkinukbvykbxetmky.supabase.co/storage/v1/object/public/today-json/today.json')
        .then(res => res.json())
        .then(data => {
            date = data['date'].replaceAll('-', '/');
            document.getElementById('titre').textContent = 'Les actus du ' + date;
            document.getElementById('kanye').textContent = data['kanye'];
            document.getElementById('catFact').textContent = data['catFact'];
            document.getElementById('catImg').src = data['catImg'];
            document.getElementById('plane').src = data['plane']['image'];
            document.getElementById('photographer').textContent = "Photo par " + data['plane']['photographer'];
            // Plane
            first_flight = data['plane']['first_flight_date'];
            first_flight = first_flight[8] + first_flight[9] + '/'
                + first_flight[5] + first_flight[6] + '/'
                + first_flight[0] + first_flight[1] + first_flight[2] + first_flight[3];
            document.getElementById('model').textContent = data['plane']['model'];
            document.getElementById('production_line').textContent = data['plane']['production_line'];
            document.getElementById('registration_number').textContent = data['plane']['registration_number'];
            document.getElementById('owner').textContent = data['plane']['owner'] || "Aucun";
            document.getElementById('first_flight_date').textContent = first_flight;
            document.getElementById('engines').textContent = data['plane']['engines_count'] + '/' + data['plane']['engines_type'];
            document.getElementById('status').textContent = capitalizeFirstLetter(data['plane']['status']);

        })
        .catch(err => console.error(err));
})

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}