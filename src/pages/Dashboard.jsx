import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getNotes, createNote, deleteNote } from '../services/noteService.js';
import NoteCard from '../components/NoteCard.jsx';

export default function Dashboard() {
  const { token, user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  async function load() {
    try {
      const data = await getNotes(token);
      setNotes(data);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load notes');
    }
  }

  useEffect(() => { load(); }, []);

  async function addNote(e) {
    e.preventDefault();
    setError('');
    try {
      const n = await createNote(token, { title, content });
      setNotes(prev => [n, ...prev]);
      setTitle('');
      setContent('');
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to create note');
    }
  }

  async function handleDelete(id) {
    try {
      await deleteNote(token, id);
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to delete note');
    }
  }

  return (
    <div>
      <h2 className="header">Welcome{user?.name ? `, ${user.name}` : ''} 👋</h2>
      {error && <div className="card" style={{ borderColor: '#ef4444' }}>{error}</div>}

      <form onSubmit={addNote} className="card">
        <input className="input" placeholder="Note title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea className="input" placeholder="Details (optional)" rows="3" value={content} onChange={e => setContent(e.target.value)} />
        <button className="btn btn-primary">Add Note</button>
      </form>

      <div className="grid">
        {notes.map(n => <NoteCard key={n._id} note={n} onDelete={handleDelete} />)}
      </div>
    </div>
  );
}
