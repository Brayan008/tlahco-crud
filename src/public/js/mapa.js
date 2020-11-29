var OLa = 20.9241749;
var OLo = -100.742277321;

let myMap = L.map('myMap').setView([OLa, OLo,15], 13)

L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
  maxZoom: 18,
  atribución: '&copy;<ahref ="https://osm.org/copyright">colaboradores de OpenStreetMap</a>' 
}).addTo(myMap);

L.marker([OLa, OLo]).addTo(myMap)
    .bindPopup('Sucursal Tlhaco LS')
    .openPopup();

let marker = L.marker([OLa, OLo,15]).addTo(myMap)



let iconMarker = L.icon({
    iconUrl: 'marker.png',
    iconSize: [60, 60],
    iconAnchor: [30, 60]
})


/*PONER UN ICON Y METODO QUE PERMITE CON DOBLECK MARCAR
let marker2 = L.marker([51.51, -0.09], { icon: iconMarker }).addTo(myMap)

myMap.doubleClickZoom.disable()
myMap.on('dblclick', e => {
  let latLng = myMap.mouseEventToLatLng(e.originalEvent);

  L.marker([latLng.lat, latLng.lng], { icon: iconMarker }).addTo(myMap)
})
*/

navigator.geolocation.getCurrentPosition(
  (pos) => {
    const { coords } = pos
    const { latitude, longitude } = coords
    L.marker([latitude, longitude]/*, { icon: iconMarker }*/).addTo(myMap)

    setTimeout(() => {
      myMap.panTo(new L.LatLng(latitude, longitude))
      L.Routing.control({
        waypoints: [
          L.latLng(latitude, longitude),//start 
          L.latLng(OLa, OLo,15)//fin
        ],
        routeWhileDragging: true,
        router: L.Routing.mapbox('pk.eyJ1IjoiYnJheWFuMDA4IiwiYSI6ImNrZnprbjVhaDA2ZWEzMHA1ODQ5cXg4bWkifQ.bj3D7qUEbC-lW7Hud0ROfQ'),
      }).addTo(myMap)
    }, 5000)
  },
  (error) => {
    console.log(error)
  },
  {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
    
  })



  

