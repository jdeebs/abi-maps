import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";

// Need to define availableTypes array with all marker types here

// Need to add state change to onFilterChange

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
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
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

export default FilterMarkers;
