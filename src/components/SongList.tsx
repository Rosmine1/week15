import { ListGroup } from "react-bootstrap";
import Song from "./Song";
import { SongItem } from "../types";

type SongListProps = {
  songs: SongItem[];
  toggleComplete: (id: number) => void;
  deleteSong: (id: number) => void;
};

export default function SongList({
  songs,
  toggleComplete,
  deleteSong,
}: SongListProps) {
  console.log({ songs });

  return (
    <ListGroup>
      {songs?.length > 0 ? (
        songs?.map((song: SongItem) => (
          <ListGroup.Item key={song.id}>
            <Song
              song={song}
              toggleComplete={toggleComplete}
              deleteSong={deleteSong}
            />
          </ListGroup.Item>
        ))
      ) : (
        <h2
          style={{ textAlign: "center", marginTop: "50px", color: "lightgray" }}
        >
          Playlist full!
        </h2>
      )}
    </ListGroup>
  );
}
