import { useState } from 'react';
import { Marker, Popup, useMapEvents, useMap } from 'react-leaflet';

function ClickToMark() {
    const map = useMap();
    const [position, setPosition] = useState(null);

    useMapEvents({
        click(e) {
            const coords = {
                lat: parseFloat(e.latlng.lat.toFixed(2)),
                lng: parseFloat(e.latlng.lng.toFixed(2)),
            }

            const formattedCoords = JSON.stringify(coords, null, 2);

            // Copy to clipboard
            navigator.clipboard.writeText(formattedCoords)
                .then(() => {
                    // Create popup at clicked location
                    const popup = L.popup()
                        .setLatLng(e.latlng)
                        .setContent(`Coordinates [${position.lat.toFixed(2)}, ${position.lng.toFixed(2)}] copied to clipboard`)
                        .openOn(map);

                    setTimeout(() => {
                        map.closePopup(popup);
                    }, 1500);
                })
                .catch((err) => {
                    console.error("Failed to copy:", err);
                })

            // Update state
            setPosition(coords);
        },
    });

    return position ? (
        <Marker position={position}>
            <Popup>
                Coordinates:<br />
                {position.lat.toFixed(2)}, {position.lng.toFixed(2)}
            </Popup>
        </Marker>
    ) : null;
}

export default ClickToMark;