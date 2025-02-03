import React, { useState, useEffect } from "react";
import { getTimeAgoText } from "../util/getTimeAgoText";

const TimeAgo: React.FC<{ pastDate: Date }> = ({ pastDate }) => {
  const [timeAgoText, setTimeAgoText] = useState<string>(
    getTimeAgoText(pastDate)
  );

  useEffect(() => {
    // Update the timeAgo text every second
    const intervalId = setInterval(() => {
      setTimeAgoText(getTimeAgoText(pastDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [pastDate]);

  return <div>{timeAgoText}</div>;
};

export default TimeAgo;
