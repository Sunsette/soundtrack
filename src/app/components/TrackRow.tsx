import { FragmentOf, graphql } from "../../graphql";
import { displayImageUrl } from "../util/displayImageUrl.util";
import TimeAgo from "./TimeAgo";
import style from "./TrackRow.module.css";

export function TrackRow(props: { entry: HistoryTrack }): JSX.Element | null {
  const { entry } = props;
  const { track } = entry;
  if (!entry || !track) return null;

  return (
    <tr className={style["fade-in"]}>
      <td>
        {track.display?.image?.placeholder ? (
          <img
            src={displayImageUrl(track.display, 300)}
            alt={`Album cover for ${track.display.title} by ${track.artists?.map((artist) => artist.name).join(", ")}`}
            className={style.cover}
          />
        ) : (
          <div className={style.cover} />
        )}
      </td>
      <td>{track.display?.title}</td>
      <td>{track.artists?.map((artist) => artist.name).join(", ")}</td>
      <td className={style.truncate}>{track.album?.title}</td>
      <td>
        <TimeAgo pastDate={new Date(entry.startedAt)}></TimeAgo>
      </td>
    </tr>
  );
}

/**
 * Fields used to display a given entity.
 * Most of the types available in the Soundtrack API implements this interface.
 */
export const DisplayableFragment = graphql(/* GraphQL */ `
  fragment DisplayableFragment on Displayable {
    display {
      title
      image {
        placeholder
      }
    }
  }
`);

export const TrackFragment = graphql(
  /* GraphQL */ `
    fragment TrackFragment on Track {
      id
      ...DisplayableFragment
      artists {
        id
        name
      }
      album {
        title
      }
    }
  `,
  [DisplayableFragment]
);

export type Track = FragmentOf<typeof TrackFragment>;

export const HistoryTrackFragment = graphql(
  /* GraphQL */ `
    fragment HistoryTrackFragment on HistoryTrack {
      id
      startedAt
      track {
        ...TrackFragment
      }
    }
  `,
  [TrackFragment]
);

export type HistoryTrack = FragmentOf<typeof HistoryTrackFragment>;
