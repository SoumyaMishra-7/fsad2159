import { useState, useEffect } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "./api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null); // NEW: track note being edited

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  // NEW: handle Add or Update Note
  const handleSaveNote = async () => {
    if (!title || !content) return;

    if (editingId) {
      // Update existing note
      await updateNote(editingId, { title, content });
      setEditingId(null); // exit edit mode
    } else {
      // Add new note
      await createNote({ title, content });
    }

    setTitle("");
    setContent("");
    fetchNotes(); // refresh list
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>My Notes App</h1>

      {/* Form for Add / Edit */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%", padding: "8px", height: "80px" }}
        ></textarea>
        <br />
        <button onClick={handleSaveNote} style={{ marginTop: "8px", padding: "8px 16px" }}>
          {editingId ? "Update Note" : "Add Note"} {/* CHANGED: show text based on edit mode */}
        </button>

        {/* NEW: Cancel edit button */}
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setTitle("");
              setContent("");
            }}
            style={{ marginLeft: "8px", padding: "8px 16px" }}
          >
            Cancel
          </button>
        )}
      </div>

      <hr />

      {/* Notes List */}
      <div>
        {notes.map((note) => (
          <div
            key={note._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleDelete(note._id)} style={{ marginRight: "8px" }}>
              Delete
            </button>

            {/* NEW: Edit button */}
            <button
              onClick={() => {
                setEditingId(note._id);
                setTitle(note.title);
                setContent(note.content);
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
