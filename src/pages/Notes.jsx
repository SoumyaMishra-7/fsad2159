const Notes = () => {
  const notes = [
    { id: 1, title: "First Note", content: "This is my first note" },
    { id: 2, title: "Second Note", content: "Learning MERN stack" }
  ];

  return (
    <div>
      <h2>My Notes</h2>
      {notes.map(note => (
        <div key={note.id}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Notes;
