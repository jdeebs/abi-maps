import { MapContainer, ImageOverlay } from 'react-leaflet';
import L from "leaflet";
import ClickToMark from '../ClickToMark/ClickToMark.jsx';
import MarkerLayer from '../MarkerLayer/MarkerLayer.jsx';
import FilterMarkers from '../FilterMarkers/FilterMarkers.jsx';
import { markerTypes } from '/src/utils/markerIcons.js';

import 'leaflet/dist/leaflet.css';
import "./Map.css";

// Valley Map Image
import valleyMapImage from '/src/assets/images/Valley-Map.webp';

function Map() {
    // Define bounds of valley map
    const valleyBounds = [
        [0, 0], // Top-left corner (y, x)
        [1833, 3028], // Bottom-right corner (y, x)
    ];
  
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
        <ClickToMark />
        <MarkerLayer />
        </MapContainer>
    );
}

export default Map;
