// Google Maps initialization for 3CG Electric
let map;
let marker;
let infoWindow;

// Google Maps initialization for 3CG Electric
function initMap() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeMap);
    } else {
        initializeMap();
    }
}

function initializeMap() {
    try {
        // Get map container
        const mapContainer = document.getElementById('map');
        if (!mapContainer) {
            console.error('Map container not found');
            return;
        }

        // 403 Lafayette St., Youngsville, LA coordinates
        const companyLocation = { 
            lat: 30.101431, 
            lng: -92.016914 
        };
        
        // Create the map
        const map = new google.maps.Map(mapContainer, {
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

        // Add marker
        const marker = new google.maps.Marker({
            position: companyLocation,
            map: map,
            title: '3CG Electric LLC',
            animation: google.maps.Animation.DROP
        });

        // Info window content
        const contentString = `
            <div style="padding: 10px; min-width: 200px;">
                <h3 style="font-weight: bold; margin-bottom: 5px;">3CG Electric LLC</h3>
                <p style="margin: 2px 0;">403 Lafayette St.</p>
                <p style="margin: 2px 0;">Youngsville, LA</p>
                <p style="margin: 2px 0;"><a href="tel:3372579747">(337) 257-9747</a></p>
                <p style="margin: 5px 0 0;">
                    <a href="https://www.google.com/maps/dir/?api=1&destination=403+Lafayette+St+Youngsville+LA" 
                       target="_blank" 
                       style="color: #1a73e8; text-decoration: none;">
                        Get Directions
                    </a>
                </p>
            </div>
        `;

        // Create and open info window
        const infoWindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        // Open info window by default
        infoWindow.open(map, marker);

        // Handle window resize
        window.addEventListener('resize', () => {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(companyLocation);
        });

    } catch (error) {
        console.error('Error initializing map:', error);
        handleMapError();
    }
}

function handleMapError() {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
        mapDiv.innerHTML = `
            <div class="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                <div class="text-center p-4">
                    <p class="text-gray-600 mb-2">Unable to load map</p>
                    <p class="text-sm">
                        <a href="https://www.google.com/maps/dir/?api=1&destination=403+Lafayette+St+Youngsville+LA" 
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