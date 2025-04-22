import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import PropTypes from "prop-types";

const FilterMarkers = ({
  availableTypes,
  markerLabels = {},
  initialActiveTypes = [],
  onFilterChange,
}) => {
  // Track which type is currently selected
  const [activeTypes, setActiveTypes] = useState(initialActiveTypes);

  // Handle toggle of types
  const handleTypeToggle = (type) => {
    setActiveTypes((prev) => {
      // Check if the clicked type is already active
      if (prev.includes(type)) {
        // If active, remove it from array
        return prev.filter((t) => t !== type);
      } else {
        // If inactive, add it to the array
        return [...prev, type];
      }
    });
  };

  // Run every time activeTypes changes
  // Notify parent component to update on filter changes
  useEffect(() => {
    onFilterChange(activeTypes);
  }, [activeTypes, onFilterChange]);

  return (
    <div className="filter-container">
      <h4>Filter Markers</h4>
      <ButtonGroup variant="outlined" aria-label="marker type filter">
        {/* Maps availableTypes to MUI buttons */}
        {availableTypes.map((type) => (
          <Button
            key={type}
            // contained = active filter
            // outlined = inactive filter
            variant={activeTypes.includes(type) ? "contained" : "outlined"}
            onClick={() => handleTypeToggle(type)}
            sx={{ textTransform: "none" }}
          >
            {markerLabels[type] || type.replace(/ _/g, ' ')}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

FilterMarkers.propTypes = {
  availableTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  markerLabels: PropTypes.objectOf(PropTypes.string),
  initialActiveTypes: PropTypes.arrayOf(PropTypes.string),
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterMarkers;
