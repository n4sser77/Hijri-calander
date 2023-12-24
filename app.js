document.addEventListener('DOMContentLoaded', async function() {
    displayIslamicDate();
    fetchMosqueImage();
    createCalendar();
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
    const accessKey = '';
    const endpoint = 'https://api.unsplash.com/photos/mosque';
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

function createCalendar() {
    const calendarElement = document.getElementById('calendar');
    const daysInMonth = 30; // Assuming a standard Hijri month

    let tableHtml = `
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Placeholder for the current day (January 1, 2024)
    const currentDay = 1;

    for (let week = 0; week < 5; week++) {
        tableHtml += '<tr>';
        for (let day = 1; day <= 7; day++) {
            const dayNumber = (week * 7) + day;
            const isCurrentDay = dayNumber === currentDay;
            tableHtml += `<td class="${isCurrentDay ? 'table-info' : ''}">${dayNumber}</td>`;
        }
        tableHtml += '</tr>';
    }

    tableHtml += `
            </tbody>
        </table>
    `;

    calendarElement.innerHTML += tableHtml;
}
