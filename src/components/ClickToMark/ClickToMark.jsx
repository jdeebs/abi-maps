import { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

function ClickToMark() {
    const [position, setPosition] = useState(null);

    useMapEvents({
        click(e) {
            const { latlng } = e;

            // Update state
            setPosition(latlng);
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