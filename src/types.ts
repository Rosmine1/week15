export type SongItem = {
    id: string;
    title: string;
    completed: boolean;
  };
  
export type NewSongItem = Omit<SongItem, "id">;