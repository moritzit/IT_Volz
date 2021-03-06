//var rad = document.getElementById("radius");
//var type = document.getElementById("Kraftstoff");
//var sort = document.getElementById("sort");
//async function getInputValue(){
// Selecting the input element and get its value
// var rad = document.getElementById("radius").value;
//}
controller();

async function controller() {
  const fuelType = document.getElementById("Kraftstoff").value;
  const radius = document.getElementById("Radius").value;
  const sort = document.getElementById("Sort").value;

  const position = await getPosition();
  const lat = position.coords.latitude;

  const lng = position.coords.longitude;

  const data = await getTankerkoenigData(lat, lng, radius, fuelType, sort);

  //const value = localStorage.getItem("key");

  table(data.stations, fuelType);

  //table1(value.item);
}

async function table(tankstellen, fuelType) {
  const div = document.getElementById("tableContainer");

  let table =
    "<table><tr><th>Favoriten</th><th>Name</th><th>Preis</th><th>Entfernung</th><th>Straße</th><th>Ort</th><th>Beste-Zeit</th></tr>";

  for (let item of tankstellen) {
    let id = item.id;

    let data2 = await getVisData(id, fuelType);
    //console.log(data2);

    table += `<tr><td> <button type="button" onclick="favHin(id);">zu Favoriten</button>   </td> <td>${
      item.brand
    }</td><td>${item.price}&#8364</td><td>${item.dist}km</td><td>${
      item.street + item.houseNumber
    }</td><td>${item.place}</td><td>${data2.text}</td></tr>`;
  }

  table += "</table>";

  div.innerHTML = table;
}

async function getPosition() {
  const position = await geoLocation();
  return position;
  // wie schreibt man in den HTML DOM ?
  // var lat = document.getElementById("lat"); // Best times
  // lat.innerHTML = latitude;
  // var lng = document.getElementById("lng"); // Best times
  // lng.innerHTML = longitude;
}

function geoLocation() {
  if (!navigator.geolocation)
    return "Geolokation wird von ihrem Browser nicht unterstützt.";
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getTankerkoenigData(lat, lng, rad, type, sort) {
  // Beispiel mit Umkreissuche:
  const url = new URL("https://creativecommons.tankerkoenig.de/json/list.php");
  const params = url.searchParams;

  params.set("lat", lat); // Breitengrad
  params.set("lng", lng); // Längengrad8.78282
  params.set("rad", rad); // Suchradius in km (max 25 km)
  params.set("type", type); // Spritsorte: 'e5', 'e10', 'diesel' oder 'all'
  params.set("sort", sort); // Sortierung: price, dist
  params.set("apikey", "81de83a1-2ba6-6310-ea8c-d7fdd0067e01"); //persönlicher Api-Key
  //2. Key: e15138bb-ada0-9a6d-c4ad-bcac2c4ca613

  const tankerkoenigData = await fetchData(url);
  return tankerkoenigData;
}

async function fetchData(url) {
  // fetch url
  const response = await fetch(url);
  // parse response body and return
  return await response.json();
}

getVisData();

async function getVisData(id, fuelType) {
  const stationPath = id.split("-").join("/");

  const urlVisHead =
    "https://www.volzinnovation.com/fuel_price_variations_germany/data2/";
  const urlVisTail = "/" + fuelType + ".json";

  const visData = await fetchData(urlVisHead + stationPath + urlVisTail);
  return visData;
}

//async function favHin(fav) {
//const favIds = [
// "12c1ee3a-2e86-4b1c-9a4d-66dd0adc4c7e",
// "8e85a891-70b5-4240-addd-08e180442ce1",
//"72f6bb23-29e5-4533-8c32-9fb6a7a2c28c"
//];
//
// Syntax:
// Item hinzufügen
// localStorage.setItem("key", fav);
//}
// Item auslesen

//const fav = localStorage.getItem("key");

//console.log(id);

// Löscht alle Einträge
//localStorage.clear();

// Objekte und Arrays können in Json Strings umgewandelt werden
//localStorage.setItem("favs", JSON.stringify(favIds));

//let favs = localStorage.getItem("favs");
//favs = JSON.parse(favs);
//console.log(favs);

//async function table1(favoriten) {
// const div = document.getElementById("tableContainer");

// let table =
//"<table><tr><th>Name</th><th>Preis</th><th>Entfernung</th><th>Straße</th><th>Ort</th><th>Beste-Zeit</th></tr>";

// for (let item of favoriten) {
//   let id = item.id;

//  let data3 = await getVisData(id);
//console.log(data2);

// table += `<tr><td> <button type="button" onclick="favLoe();">zu Favoriten</button>   </td> <td>${
//    item.brand
//  }</td><td>${item.price}&#8364</td><td>${item.dist}km</td><td>${
//    item.street + item.houseNumber
//  }</td><td>${item.place}</td><td>${data3.text}</td></tr>`;
// }

//table += "</table>";

//div.innerHTML = table;
//}

//async function favLoe(fav) {
// const fav = localStorage.getItem("key");

// localStorage.removeItem("key");
//}
