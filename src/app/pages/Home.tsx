import * as React from "react";
import { DebugToolbar } from "../components/DebugToolbar";
import Spinner from "../components/Spinner";
import TrackCard from "../components/TrackCard";
import { TrackRow } from "../components/TrackRow";
import ZoneSelect from "../components/ZoneSelect";
import useEntries from "../hooks/useEntries";
import style from "./Home.module.css";

/**
 * A selection of various sound zones in the Soundtrack Stockholm office.
 * At least one of these zones should be playing music at any given time.
 * The value represents the "short ID" of the zone, which can be used to get
 * playback history without being authenticated.
 */
const SOUNDTRACK_ZONES = {
  Lounge: "BRGJFA",
  Listen: "ODJECD",
  "Glass Room": "SNLETO",
} as const;

export function Home(): JSX.Element {
  const [shortID, setShortID] = React.useState(
    location.hash?.slice(1) || SOUNDTRACK_ZONES.Lounge
  );
  const {
    entries,
    fetching,
    error,
    subscriptionError,
    setEntries,
    appendEntry,
  } = useEntries(shortID);

  const handleZoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newShortID = event.target.value;
    setEntries([]);
    setShortID(newShortID);
    location.hash = newShortID;
  };

  if (error) {
    return <p>Error loading entries: {error.message}</p>;
  }
  if (subscriptionError) {
    return <p>Error with subscription: {subscriptionError.message}</p>;
  }
  if (fetching && entries.length === 0) {
    return <Spinner></Spinner>;
  }

  return (
    <main className={style.main}>
      <h1>🎶 Soundtrack 🎶</h1>
      <div className={style.tools}>
        <ZoneSelect
          shortID={shortID}
          handleZoneChange={handleZoneChange}
          zones={SOUNDTRACK_ZONES}
        />
        <DebugToolbar onAddTrack={appendEntry} />
      </div>
      {!!entries.length && (
        <div>
          <h2>Now Playing</h2>
          <TrackCard entry={entries[0]}></TrackCard>
        </div>
      )}
      {/* TODO: Move table to its own file */}
      {entries.length > 1 && (
        <div className={style["table-container"]}>
          <h2>History</h2>
          <table className={style["responsive-table"]}>
            <thead>
              <tr>
                <th className="cover"></th>
                <th>Title</th>
                <th>Artists</th>
                <th>Album</th>
                <th>Played</th>
              </tr>
            </thead>
            <tbody>
              {entries.slice(1).map((historyTrack) => {
                return (
                  <TrackRow key={historyTrack.startedAt} entry={historyTrack} />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
