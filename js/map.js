// Google Maps initialization for 3CG Electric
function initMap() {
    // 403 Lafayette St., Youngsville, LA coordinates
    const companyLocation = { 
        lat: 30.101431, 
        lng: -92.016914 
    };
    
    // Map options
    const mapOptions = {
        zoom: 15,
        center: companyLocation,
        styles: [
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    { "visibility": "off" }
                ]
            }
        ]
    };

    // Create the map
    const map = new google.maps.Map(
        document.getElementById('map'), 
        mapOptions
    );

    // Custom marker options
    const marker = new google.maps.Marker({
        position: companyLocation,
        map: map,
        title: '3CG Electric LLC',
        animation: google.maps.Animation.DROP
    });

    // Info window content
    const contentString = `
        <div class="p-2">
            <h3 class="font-bold mb-1">3CG Electric LLC</h3>
            <p class="mb-1">403 Lafayette St.</p>
            <p class="mb-1">Youngsville, LA</p>
            <p class="mb-1"><a href="tel:3372579747">(337) 257-9747</a></p>
        </div>
    `;

    // Create info window
    const infoWindow = new google.maps.InfoWindow({
        content: contentString
    });

    // Add click listener to marker
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// Handle map load errors
function handleMapError() {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
        mapDiv.innerHTML = `
            <div class="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                <div class="text-center p-4">
                    <p class="text-gray-600 mb-2">Unable to load map</p>
                    <p class="text-sm">
                        <a href="https://maps.google.com/?q=403+Lafayette+St,+Youngsville,+LA" 
                           class="text-blue-500 hover:text-blue-600"
                           target="_blank">
                            View on Google Maps
                        </a>
                    </p>
                </div>
            </div>
        `;
    }
}