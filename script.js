// Map

const map = L.map('map').setView([37.38605, -122.08385], 12);
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});
osm.addTo(map);

const marker = L.marker([37.38605, -122.08385]).addTo(map);

// API

const test = async () => {
  const response = await fetch(
    'https://geo.ipify.org/api/v2/country,city?apiKey=at_pir6vPHSrwk58xItmUfF79suaWhcy&ipAddress=8.8.8.8'
  );

  const data = await response.json();
  console.log(data.location);
};

test();

// https://geo.ipify.org/docs --- API Page
