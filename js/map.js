function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.8336, lng: -87.6275 },
    zoom: 12,
  });

  const locations = [
    {
      position: { lat: 41.8758, lng: -87.6189 },
      name: "Millennium Park",
      description: "The best park in Chicago.",
      icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    },
    {
      position: { lat: 41.8663, lng: -87.6068 },
      name: "Art Institute of Chicago",
      description: "A pretty cool art museum.",
      icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    },
    {
      position: { lat: 41.8796, lng: -87.6237 },
      name: "Navy Pier",
      description: "The best (and only?) ferris wheel in Chicago.",
      icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    },
  ];

  locations.forEach((location) => {
    const marker = new google.maps.Marker({
      position: location.position,
      map: map,
      title: location.name,
      icon: location.icon,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<h3>${location.name}</h3><p>${location.description}</p>`,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
      document.getElementById("location-name").textContent = location.name;
      document.getElementById("location-description").textContent =
        location.description;
    });
  });

  const geolocationButton = document.getElementById("geolocation-button");
  geolocationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(userLocation);
          map.setZoom(15);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  });
}
