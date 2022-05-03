// Map
const map = L.map('map');

const coordinates = (lat, lng) => {
  map.setView([lat, lng], 13);

  const osm = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );
  osm.addTo(map);

  const locationIcon = L.icon({
    iconUrl: 'images/icon-location.svg',

    iconSize: [40, 50],
    iconAnchor: [20, 50],
  });

  map.zoomControl.remove();

  L.marker([lat, lng], { icon: locationIcon }).addTo(map);
};

// API

const ipText = document.querySelector('.ip');
const city = document.querySelector('.city');
const timezone = document.querySelector('.timezone');
const isp = document.querySelector('.isp');
const input = document.querySelector('.ip-input');
const btn = document.querySelector('.ip-submit');

const getIP = async () => {
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();

  let ip = data.ip;

  getDataOnLoad(ip);
  getDataOnSubmit(ip);
};

const getDataOnLoad = async (ip) => {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_pir6vPHSrwk58xItmUfF79suaWhcy&ipAddress=${ip}`
  );
  const data = await response.json();

  lat = data.location.lat;
  lng = data.location.lng;

  ipText.innerHTML = data.ip;
  city.innerHTML = `${data.location.city}, ${data.location.region}`;
  timezone.innerHTML = `UTC ${data.location.timezone}`;
  isp.innerHTML = data.isp;

  coordinates(lat, lng);
};

const getDataOnSubmit = (ip) => {
  btn.addEventListener('click', () => {
    ip = input.value;
    getDataOnLoad(ip);
  });
};

getIP();
