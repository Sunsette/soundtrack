import React from "react";
import styles from "./ZoneSelect.module.css";

interface ZoneSelectProps {
  shortID: string;
  handleZoneChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  zones: { [key: string]: string };
}

const ZoneSelect: React.FC<ZoneSelectProps> = ({
  shortID,
  handleZoneChange,
  zones,
}) => {
  return (
    <select
      className={styles["zone-select"]}
      value={shortID}
      onChange={handleZoneChange}
    >
      {Object.entries(zones).map(([zoneName, zoneID]) => (
        <option key={zoneID} value={zoneID}>
          {zoneName}
        </option>
      ))}
    </select>
  );
};

export default ZoneSelect;
