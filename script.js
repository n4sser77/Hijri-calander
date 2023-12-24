document.addEventListener('DOMContentLoaded', function() {
    displayIslamicDate();
    fetchMosqueImage();
});

function displayIslamicDate() {
    const todayGregorian = new Date();
    const todayIslamic = new HijriDate(todayGregorian);
    
    const calendarElement = document.getElementById('calendar');
    calendarElement.innerHTML = `
        <p>Today's Date (Gregorian): ${todayGregorian.toDateString()}</p>
        <p>Today's Date (Islamic): ${todayIslamic.getDate()}/${todayIslamic.getMonth() + 1}/${todayIslamic.getFullYear()}</p>
    `;
}

async function fetchMosqueImage() {
    const accessKey = 'YOUR_UNSPLASH_ACCESS_KEY';
    const endpoint = 'https://api.unsplash.com/photos/random';
    const theme = 'mosque';

    try {
        const response = await fetch(`${endpoint}?query=${theme}&client_id=${accessKey}`);
        const data = await response.json();

        const imageElement = document.getElementById('image');
        imageElement.innerHTML = `
            <img src="${data.urls.regular}" alt="Mosque" class="img-fluid">
            <p>Photo by ${data.user.name} on Unsplash</p>
        `;
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}


