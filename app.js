const regexEmail = /^\w+@\w+\.[a-z]{2,}$/gi;
const regexDomain = /^w{0,3}\.?\w+\.\w{2,}$/gi;
const regexIp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/gi;
const map = L.map("mapId");
//al cargar la pagina aparecera esta direccion por defecto
document.addEventListener("DOMContentLoaded", () => {
  fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_PNdkqaF5pyoRnwzxUsCEDWPx0TYb9&ipAddress=8.8.8.8`
  )
    .then((res) => res.json())
    .then((data) => renderInfo(data));
});

//handle onclick in the search
btn.addEventListener("click", () => {
  const value = input.value;
  let enpoint;

  if (regexDomain.test(value)) {
    enpoint = "domain";
  }
  if (regexEmail.test(value)) {
    enpoint = " email";
  }
  if (regexIp.test(value)) {
    enpoint = "ipAddress";
  }

  fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_PNdkqaF5pyoRnwzxUsCEDWPx0TYb9&${enpoint}=${value}`
  )
    .then((res) => res.json())
    .then((data) => renderInfo(data));
});

//render infomation of the search
function renderInfo({ ip, location, isp }) {
  ipAddress.innerHTML = ip;
  locationHTML.innerHTML = `${location.city}, ${location.region}`;
  timezone.innerHTML = `UTC ${location.timezone}`;
  ispHTML.innerHTML = isp;
  updateMap(location, isp);
}
function updateMap({ lat, lng }, isp) {
  map.setView([lat, lng], 10);
  L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  L.marker([lat, lng]).bindPopup(`${isp}`).addTo(map);
}
