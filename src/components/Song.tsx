import "./Song.css";

import { Button } from "react-bootstrap";
import type { SongItem } from "../types";

type SongProps = {
  song: SongItem;
  toggleComplete: (id: number) => void;
  deleteSong: (id: number) => void;
};

export default function Song({ song, toggleComplete, deleteSong }: SongProps) {
  return (
    <div className="song">
      <p className={song?.completed ? "song-title-completed " : ""}>
        {song?.title}
      </p>
      <div className="btn-group">
        <Button
          variant="outline-primary"
          onClick={() => toggleComplete(song?.id)}
        >
          {song?.completed ? "Undo" : "Complete"}
        </Button>
        <Button variant="outline-danger" onClick={() => deleteSong(song?.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
