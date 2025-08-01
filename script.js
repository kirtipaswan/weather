document.getElementById("locationInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") getWeather();
});

async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const resultBox = document.getElementById("weatherResult");

  if (!location) {
    resultBox.innerHTML = "Please enter a location.";
    resultBox.classList.remove("hidden");
    return;
  }

  const apiKey = "4dea374a1d3e4ac09ac65326250108";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const { temp_c, condition, last_updated } = data.current;
    const icon = condition.icon;
    const city = data.location.name;
    const country = data.location.country;

    resultBox.innerHTML = `
      <h3>${city}, ${country}</h3>
      <img src="https:${icon}" alt="${condition.text}" />
      <p><strong>${temp_c}°C</strong></p>
      <p>${condition.text}</p>
      <small>Updated: ${last_updated}</small>
    `;
    resultBox.classList.remove("hidden");
  } catch (error) {
    resultBox.innerHTML = `❌ ${error.message}`;
    resultBox.classList.remove("hidden");
  }
}
