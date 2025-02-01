import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Load notes when component mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        text: newNote,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        completed: false
      };
      setNotes([note, ...notes]);
      setNewNote('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const toggleComplete = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, completed: !note.completed } : note
    ));
  };

  return (
    <div className="app-container">
      <div className="notes-wrapper">
        <h1 className="app-title">Quick Notes</h1>

        <form onSubmit={addNote} className="note-form">
          <div className="input-group">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write a new note..."
              className="note-input"
            />
            <button type="submit" className="add-button">
              Add Note
            </button>
          </div>
        </form>

        <div className="notes-list">
          {notes.length === 0 ? (
            <div className="empty-state">
              <p>No notes yet. Start by adding one above!</p>
            </div>
          ) : (
            notes.map(note => (
              <div key={note.id} className={`note-card ${note.completed ? 'completed' : ''}`}>
                <button 
                  className="checkbox-button"
                  onClick={() => toggleComplete(note.id)}
                >
                  {note.completed && (
                    <svg 
                      viewBox="0 0 24 24" 
                      className="check-icon"
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
                <div className="note-content">
                  <p className="note-text">{note.text}</p>
                  <p className="note-date">{note.date}</p>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;