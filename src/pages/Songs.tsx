import AddSongForm from "../components/AddSongForm";
import SongList from "../components/SongList";
import SongStats from "../components/SongStats";
import { useEffect, useState } from "react";
import { NewSongItem, SongItem } from "../types";
import { Spinner } from "react-bootstrap";
import SongAlert from "../components/SongAlert";

const BASE_URL = "https://68086ce6942707d722de2b7d.mockapi.io/songs";

export default function Songs() {
  const [songs, setSongs] = useState<SongItem[]>([]);
  const [newSong, setNewSong] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const getSongs = async () => {
    setLoading(true);
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setSongs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSong = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  };

  const addSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSong) return setShowAlert(true);

    const song: NewSongItem = { title: newSong, completed: false };
    try {
      await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(song),
      });
      setNewSong("");
      getSongs();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (id: string) => {
    setLoading(true);
    const song = await getSong(id);
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...song, completed: !song.completed }),
      });
      getSongs();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSong = async (id: string) => {
    setLoading(true);
    try {
      await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      getSongs();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <>
      <h2>Songs</h2>
      <SongAlert show={showAlert} setShow={setShowAlert} />
      <AddSongForm
        value={newSong}
        onChange={(e) => setNewSong(e.target.value)}
        onSubmit={addSong}
      />
      {loading ? <Spinner animation="border" /> : (
        <>
          <SongList songs={songs} toggleComplete={toggleComplete} deleteSong={deleteSong} />
          <SongStats songs={songs} />
        </>
      )}
    </>
  );
}
