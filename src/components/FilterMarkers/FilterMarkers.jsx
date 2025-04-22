import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import PropTypes from "prop-types";

const FilterMarkers = ({
  availableTypes,
  initialActiveTypes = [],
  onFilterChange,
}) => {
  // Track which type is currently selected
  const [activeTypes, setActiveTypes] = useState(initialActiveTypes);

  // Handle toggle of types
  const handleTypeToggle = (type) => {
    setActiveTypes((prev) => {
      // Remove if already active
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        // Add if not active
        return [...prev, type];
      }
    });
  };

  useEffect(() => {
    onFilterChange(activeTypes);
  }, [activeTypes, onFilterChange]);

  return (
    <div className="filter-container">
      <h4>Filter Markers</h4>
      <ButtonGroup variant="outlined" aria-label="marker type filter">
        {availableTypes.map((type) => (
          <Button
            key={type}
            variant={activeTypes.includes(type) ? "contained" : "outlined"}
            onClick={() => handleTypeToggle(type)}
            sx={{ textTransform: "none" }}
          >
            {type}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

FilterMarkers.propTypes = {
  availableTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialActiveTypes: PropTypes.arrayOf(PropTypes.string),
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterMarkers;
