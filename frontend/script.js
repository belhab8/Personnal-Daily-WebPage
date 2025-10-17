async function get_data(supabase) {
    const { data, error } = await supabase
        .storage
        .from('today-json')
        .download('today.json');
    return data
}

window.addEventListener('DOMContentLoaded', (e) => {
    //supaURL = 'https://fevgkinukbvykbxetmky.supabase.co';
    //supaKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZldmdraW51a2J2eWtieGV0bWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NDcxOTUsImV4cCI6MjA3NjIyMzE5NX0.-GMduhUvzNeOLyg7BZtfQKjB59tI61tqFP8glHeST04';
    //const supa = createClient(supaURL, supaKey);
    //data = get_data(supa);

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
            document.getElementById('owner').textContent = data['plane']['owner'];
            document.getElementById('first_flight_date').textContent = first_flight;
            document.getElementById('engines').textContent = data['plane']['engines_count'] + '/' + data['plane']['engines_type'];
            document.getElementById('status').textContent = data['plane']['status'];

        })
        .catch(err => console.error(err));
})