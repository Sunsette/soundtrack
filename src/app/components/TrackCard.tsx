import styles from "./TrackCard.module.css";

import { HistoryTrack } from "./TrackRow";
import { displayImageUrl } from "../util/displayImageUrl.util";

interface TrackCardProps {
  entry: HistoryTrack;
}

const TrackCard: React.FC<TrackCardProps> = ({ entry }) => {
  if (!entry || !entry.track) return null;

  return (
    <div className={styles.historyTrack}>
      <div className={styles.cover}>
        <img
          src={displayImageUrl(entry.track.display, 300)}
          alt={`${entry.track.display?.title || "Track"} cover`}
        />
      </div>
      <div className={styles.details}>
        <div className={styles.title}>
          {entry.track.display?.title ?? "Unknown Title"}
        </div>
        <div className={styles.artists}>
          {Array.isArray(entry.track.artists)
            ? entry.track.artists.map((artist) => artist.name).join(", ")
            : "Unknown Artists"}
        </div>
        <div className={styles.played}>
          {new Date(entry.startedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
