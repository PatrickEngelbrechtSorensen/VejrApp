function getWeekday(dateStr) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(dateStr);
    return days[d.getDay()];
}

function reorderToFridayFirst(data) {
    let idx = data.findIndex(day => getWeekday(day.date) === 'Friday');
    if (idx === -1) return data;
    return data.slice(idx).concat(data.slice(0, idx));
}

let forecastData = [];
fetch('/forecast')
    .then(response => response.json())
    .then(data => {
        forecastData = reorderToFridayFirst(data);

        // Fill weekday header
        const table = document.getElementById('forecast-table');
        const thead = table.querySelector('thead');
        thead.innerHTML = `<tr id="weekday-row"></tr>`;
        const weekdayRow = document.getElementById('weekday-row');
        weekdayRow.innerHTML = forecastData.map(day => `<th>${getWeekday(day.date)}</th>`).join('');

        // Fill icon row
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = `
            <tr id="icon-row"></tr>
            <tr id="temp-row"></tr>
            <tr id="desc-row"></tr>
        `;
        const iconRow = document.getElementById('icon-row');
        iconRow.innerHTML = forecastData.map((day, idx) =>
            `<td style="font-size:2em; cursor:pointer;" onclick="showDetails(${idx})">${day.icon ? day.icon : ''}</td>`
        ).join('');

        // Fill temperature row
        const tempRow = document.getElementById('temp-row');
        tempRow.innerHTML = forecastData.map((day, idx) =>
            `<td style="cursor:pointer;" onclick="showDetails(${idx})">${day.temperature}°C</td>`
        ).join('');

        // Fill description row
        const descRow = document.getElementById('desc-row');
        descRow.innerHTML = forecastData.map((day, idx) =>
            `<td style="cursor:pointer;" onclick="showDetails(${idx})">${day.description}</td>`
        ).join('');
    })
    .catch(() => {
        document.body.innerHTML += "<p style='color:red;'>Failed to load forecast data.</p>";
    });

window.showDetails = function(idx) {
    const day = forecastData[idx];
    const suggestion = day.suggestions && day.suggestions.length > 0
        ? day.suggestions[Math.floor(Math.random() * day.suggestions.length)]
        : "No suggestion available";
    const details = document.getElementById('details');
    details.innerHTML = `
      <h2>Details for ${getWeekday(day.date)} (${day.date})</h2>
      <p><strong>Temperature:</strong> ${day.temperature} °C</p>
      <p><strong>Description:</strong> ${day.description} ${day.icon ? day.icon : ""}</p>
      <p><strong>Rain:</strong> ${day.rain_mm} mm</p>
      <p><strong>Wind:</strong> ${day.wind_ms} m/s</p>
      <p><strong>Clothing tips:</strong> ${day.clothing ? day.clothing.join(', ') : ''}</p>
      <p><strong>After work tip:</strong> ${suggestion}</p>
  `;
    details.style.display = 'block';
}