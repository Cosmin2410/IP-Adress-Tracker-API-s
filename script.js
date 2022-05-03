// Map

const coordinates = (lat, lng) => {
  const map = L.map('map').setView([lat, lng], 12);
  const osm = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );
  osm.addTo(map);

  const marker = L.marker([lat, lng]).addTo(map);
};

// API

const ipText = document.querySelector('.ip');
const city = document.querySelector('.city');
const timezone = document.querySelector('.timezone');
const isp = document.querySelector('.isp');
let ip = '';

const getIP = async () => {
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  ip = data.ip;

  getDataOnLoad(ip);
};

const getDataOnLoad = async (ip) => {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_pir6vPHSrwk58xItmUfF79suaWhcy&ipAddress=${ip}`
  );
  const data = await response.json();

  let lat = data.location.lat;
  let lng = data.location.lng;

  console.log(data);
  console.log(data.location.city);
  ipText.innerHTML = data.ip;
  city.innerHTML = `${data.location.city}, ${data.location.region}`;
  timezone.innerHTML = data.location.timezone;
  isp.innerHTML = data.isp;

  coordinates(lat, lng);
};

getIP();
