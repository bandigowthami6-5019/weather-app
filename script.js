const API_KEY = "YOUR_API_KEY";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const result = document.getElementById("weatherResult");

    if (city === "") {
        result.innerHTML = '<p class="error">Please enter a city name.</p>';
        return;
    }

    result.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        result.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>

            <img
                src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
                alt="${data.weather[0].description}"
            >

            <div class="temperature">
                ${Math.round(data.main.temp)}°C
            </div>

            <p>
                <strong>Condition:</strong>
                ${data.weather[0].description}
            </p>

            <p>
                <strong>Feels like:</strong>
                ${Math.round(data.main.feels_like)}°C
            </p>

            <p>
                <strong>Humidity:</strong>
                ${data.main.humidity}%
            </p>

            <p>
                <strong>Wind Speed:</strong>
                ${data.wind.speed} m/s
            </p>
        `;

    } catch (error) {
        result.innerHTML = `
            <p class="error">
                City not found. Please enter a valid city name.
            </p>
        `;
    }
}
