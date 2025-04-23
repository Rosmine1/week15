import { SongItem } from "../types";

type Props = {
  songs: SongItem[];
};

export default function SongStats({ songs }: Props) {
  const completed = songs.filter((s) => s.completed).length;
  return (
    <div className="mt-3 text-muted">
      Completed: {completed} / {songs.length}
    </div>
  );
}
