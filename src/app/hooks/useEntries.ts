import React from "react";
import { useQuery, useSubscription } from "urql";
import { type HistoryTrack, TrackFragment } from "../components/TrackRow";
import { graphql } from "../../graphql";

/**
 * Custom hook to manage and subscribe to entries based on a given shortID.
 *
 * @param {string} shortID - The short identifier for the entries.
 * @returns {object} An object containing:
 * - `entries` (HistoryTrack[]): The list of entries.
 * - `fetching` (boolean): The fetching state of the query.
 * - `error` (any): The error state of the query.
 * - `subscriptionError` (any): The error state of the subscription.
 * - `setEntries` (React.Dispatch<React.SetStateAction<HistoryTrack[]>>): Function to set the entries.
 * - `appendEntry` (function): Function to append a new entry.
 */
function useEntries(shortID: string) {
  const [entries, setEntries] = React.useState<HistoryTrack[]>([]);

  const [{ data, fetching, error }] = useQuery({
    query: ZoneNowPlayingQuery,
    variables: { shortID },
    pause: !shortID,
  });

  const [{ data: subscriptionData, error: subscriptionError }] =
    useSubscription({
      query: ZoneSubscription,
      variables: { shortID },
      pause: !shortID,
    });

  React.useEffect(() => {
    if (data && data.nowPlaying) {
      appendEntry(data?.nowPlaying!);
    }
  }, [data]);

  React.useEffect(() => {
    if (subscriptionData && subscriptionData.nowPlayingUpdate) {
      appendEntry(subscriptionData.nowPlayingUpdate?.nowPlaying!);
    }
  }, [subscriptionData]);

  const appendEntry = React.useCallback(
    (entry: OptionalKeys<HistoryTrack, "id" | "startedAt">) => {
      if (!entry?.track) {
        console.error("appendEntry: Incomplete entry", entry);
        return;
      }
      const startedAt = new Date().toString();
      entry.startedAt ||= startedAt;
      entry.id ||= startedAt;
      setEntries((prevTracks) => [entry as HistoryTrack, ...prevTracks]);
    },
    []
  );

  return {
    entries,
    fetching,
    error,
    subscriptionError,
    setEntries,
    appendEntry,
  };
}

// TODO: Move these queries to a separate file
const ZoneNowPlayingQuery = graphql(
  /* GraphQL */ `
    query ZoneNowPlayingQuery($shortID: ID!) {
      nowPlaying(soundZone: $shortID) {
        soundZone
        startedAt
        track {
          ...TrackFragment
        }
      }
    }
  `,
  [TrackFragment]
);

const ZoneSubscription = graphql(
  /* GraphQL */ `
    subscription ZoneSubscription($shortID: ID!) {
      nowPlayingUpdate(input: { soundZone: $shortID }) {
        nowPlaying {
          startedAt
          track {
            ...TrackFragment
          }
        }
      }
    }
  `,
  [TrackFragment]
);

// TODO: Move this to a separate file
/** Marks specific keys of an object as optional/nullable. */
type OptionalKeys<T, K extends PropertyKey = PropertyKey> = Omit<T, K> & {
  [P in keyof T]?: T[P] | null;
};

export default useEntries;
