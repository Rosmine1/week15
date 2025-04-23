import "./App.css";

import { Alert, Button, Form, Spinner } from "react-bootstrap";

import { NewSongItem } from "./types";
import SongList from "./components/SongList";
import { useState, ChangeEvent, useEffect, } from "react";

// import 
const BASE_URL = "https://68086ce6942707d722de2b7d.mockapi.io/songs";

function App() {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log({ e });
    // console.log({ inputValue: e.target.value, inputName: e.target.name });
    setNewSong(e.target.value);
  };

  //API reques to retreive all songs
  const getSongs = async () => {
    setLoading(true); //set loading to true while waiting for the response
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); //set loading to false after the response
    }
  };

  //API request to add a new todo
  const addSong = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!newSong) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false); //hide the alert in case it was shown before
    setLoading(true); //set loading to true while waiting for the response
    const song: NewSongItem = {
      title: newSong,
      completed: false,
    };

    try {
      await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(song),
      });
      await getSongs(); //fetch the updated list of songs
      setNewSong(""); //clear the input field after adding the song
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); //set loading to false after the response is received
    }
  };

  //API request to get a single song
  const getSong = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  //API request to update a single song

  const toggleComplete = async (id: string) => {
    setLoading(true); //set loading to true while waiting for the response
    const song = await getSong(id); //get the todo to be updated

    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...song, completed: !song.completed }), //toggle the status of the todo, but keep the other properties the same
      });
      await getSongs(); //fetch the updated list of todos
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); //set loading to false after the response is received
    }
  };

  //API request to delete a song
  const deleteSong = async (id: string) => {
    setLoading(true); //set loading to true while waiting for the response
    try {
      await fetch(`${BASE_URL}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      await getSongs(); //fetch the updated list of songs
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); //set loading to false after the response is received
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

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
            Please enter a song before adding it to the list! The task cannot be
            empty.
          </p>
        </Alert>
      )}
      <h1>Song App Example</h1>
      <form onSubmit={addSong}>
        <Form.Control
          type="text"
          value={newSong}
          onChange={handleChange}
          placeholder="Enter a task"
        />
        <Button type="submit" className="mt-2 mb-2">
          Add Song
        </Button>
      </form>

      {loading ? (
        <div className="spinner-container">
          <Spinner variant="primary" />
        </div>
      ) : (
        <SongList
          songs={songs}
          toggleComplete={toggleComplete}
          deleteSong={deleteSong}
        />
      )}
    </div>
  );
}

export default App;
