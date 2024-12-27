// Google Maps initialization for 3CG Electric
let map;
let marker;
let infoWindow;

// Store the initialization function on the window object
window.initializeMap = function() {
    try {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) {
            console.error('Map container not found');
            return;
        }

        const companyLocation = { 
            lat: 30.140638,  // Updated coordinates for Broussard address
            lng: -91.960321 
        };
        
        map = new google.maps.Map(mapContainer, {
            zoom: 15,
            center: companyLocation,
            mapTypeControl: true,
            streetViewControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            fullscreenControl: true,
            styles: [
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [
                        { "visibility": "off" }
                    ]
                }
            ]
        });

        marker = new google.maps.Marker({
            position: companyLocation,
            map: map,
            title: '3CG Electric LLC',
            animation: google.maps.Animation.DROP
        });

        const contentString = `
            <div style="padding: 10px; min-width: 200px;">
                <h3 style="font-weight: bold; margin-bottom: 5px;">3CG Electric LLC</h3>
                <p style="margin: 2px 0;">1105 Young St.</p>
                <p style="margin: 2px 0;">Broussard, LA 70518</p>
                <p style="margin: 2px 0;"><a href="tel:3372579747">(337) 257-9747</a></p>
                <p style="margin: 5px 0 0;">
                    <a href="https://www.google.com/maps/dir/?api=1&destination=1105+Young+St+Broussard+LA+70518" 
                       target="_blank" 
                       style="color: #1a73e8; text-decoration: none;">
                        Get Directions
                    </a>
                </p>
            </div>
        `;

        infoWindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        infoWindow.open(map, marker);

        window.addEventListener('resize', () => {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(companyLocation);
        });

    } catch (error) {
        console.error('Error initializing map:', error);
        handleMapError();
    }
};

function handleMapError() {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
        mapDiv.innerHTML = `
            <div class="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                <div class="text-center p-4">
                    <p class="text-gray-600 mb-2">Unable to load map</p>
                    <p class="text-sm">
                        <a href="https://www.google.com/maps/dir/?api=1&destination=1105+Young+St+Broussard+LA+70518" 
                           class="text-blue-500 hover:text-blue-600"
                           target="_blank">
                            Get Directions to 3CG Electric
                        </a>
                    </p>
                </div>
            </div>
        `;
    }
}

// In case the callback doesn't work
window.addEventListener('load', () => {
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        handleMapError();
    }
});

// Make sure initMap is available for the Google Maps callback
window.initMap = function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initializeMap);
    } else {
        window.initializeMap();
    }
};