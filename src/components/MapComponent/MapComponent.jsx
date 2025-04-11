import { MapContainer, ImageOverlay, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from "leaflet";

import 'leaflet/dist/leaflet.css';
import "./MapComponent.css";

// Valley Map Image
import valleyMapImage from '/src/assets/images/Valley-Map.webp';

function MapComponent() {
    // Define bounds of valley map
    const valleyBounds = [
        [0, 0], // Top-left corner (y, x)
        [1833, 3028], // Bottom-right corner (y, x)
    ];

    // Inline component to apply fitBounds
    const CenterMap = () => {
        // Leaflet hook to get access to map instance
        const map = useMap();

        // Runs after MapComponent is added to the DOM
        useEffect(() => {
            map.fitBounds(valleyBounds);
        }, [map]);

        // Component doesn't render anything visually
        // so just returns null
        return null;
    }
  
    return (
        <MapContainer
            // Simple CRS needed for non-geographical maps
            crs={L.CRS.Simple}
            bounds={valleyBounds}
            maxBounds={valleyBounds}
            maxBoundsViscosity={1}
            minZoom={-2}
            attributionControl={false}
            style={{ width: '100%', height: '100%' }}
        >
        <ImageOverlay
            url={valleyMapImage}
            bounds={valleyBounds}
        />
        <CenterMap />
        </MapContainer>
    );
}

export default MapComponent;
