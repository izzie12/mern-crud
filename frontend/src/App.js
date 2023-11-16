import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  //State
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });
  
  //Functions
  const fetchNotes = async () => {
    //Fetching the Notes
    const res = await axios.get("http://localhost:3500/notes");
    //Set Notes to State
    setNotes(res.data.notes);
  };

  const updateCreateForm = (e) => {
    const { name, value } = e.target;
    setCreateForm({ ...createForm, [name]: value});
  };

  const createNote = async (e) => {
    e.preventDefault();

    //Create Note
    const res = await axios.post("https:localhost:3500/notes", createForm)

    //Update State


  }

  //Use Effect
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="App">
      <div>
        <h2>Notes:</h2>
        {notes &&
          notes.map((note) => {
            return (
              <div key={note._id}>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </div>
            );
          })}
      </div>

      <div>
        <h2>Create a Note:</h2>
        <form onSubmit={createNote}>
          <input onChange={updateCreateForm} value={createForm.title} name="title" type="text" placeholder="Title" />
          <textarea onChange={updateCreateForm} value={createForm.body} name="body" placeholder="Body"></textarea>
          <button type="button">Create</button>
        </form>
      </div>
    </div>
  );
}

export default App;
