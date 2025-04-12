import "./App.css";

import { Alert, Button, Form } from "react-bootstrap";

import { SongItem } from "./types";
import SongList from "./components/SongList";
import { defaultsongs } from "./data";
import { useState } from "react";

function App() {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [newSong, setNewSong] = useState<string>("");

  const [songs, setSongs] = useState<SongItem[]>(defaultsongs);

  const addSong = () => {
    if (!newSong) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    const song: SongItem = {
      id: songs.length + 1,
      title: newSong,
      completed: false,
    };
    setSongs([...songs, song]);
    setNewSong("");
  };

  const toggleComplete = (id: number) => {
    const updatedSongs = songs.map((song) => {
      if (song.id === id) {
        song.completed = !song.completed;
      }
      return song;
    });

    setSongs(updatedSongs);
  };

  const deleteSong = (id: number) => {
    const updatedSongs = songs.filter((song) => song.id !== id);
    setSongs(updatedSongs);
  };

  return (
    <div className="container">
      {showAlert && (
        <Alert
          variant="danger"
          style={{ marginTop: "15px" }}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {/* <Alert.Heading>Oh snap! You got an error!</Alert.Heading> */}
          <p>
            Please enter a task before adding it to the list! The task cannot be
            empty.
          </p>
        </Alert>
      )}
      <h1>Song App Example</h1>
      <Form.Control
        type="text"
        value={newSong}
        onChange={(e) => setNewSong(e.target.value)}
        placeholder="Enter a task"
      />
      <Button className="mt-2 mb-2" onClick={addSong}>
        Add Song
      </Button>
      <SongList
        songs={songs}
        toggleComplete={toggleComplete}
        deleteSong={deleteSong}
      />
    </div>
  );
}

export default App;
