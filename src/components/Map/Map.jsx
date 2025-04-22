import { useState } from "react";
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
    // State to store active filter types for markers
    const [activeTypes, setActiveTypes] = useState([]);
    const [markerLabels, setMarkerLabels] = useState({});

    // Define bounds of valley map
    const valleyBounds = [
        [0, 0], // Top-left corner (y, x)
        [1833, 3028], // Bottom-right corner (y, x)
    ];

    const handleFilterChange = (newActiveTypes) => {
        setActiveTypes(newActiveTypes);
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
        <ClickToMark />
        <FilterMarkers
            availableTypes={markerTypes}
            markerLabels={markerLabels}
            initialActiveTypes={['ammo_cache']}
            onFilterChange={handleFilterChange}
        />
        <MarkerLayer 
            activeTypes={activeTypes}
            onLabelsLoaded={(labels) => setMarkerLabels(labels)}
        />
        </MapContainer>
    );
}

export default Map;
