import React from 'react';


export default function NoteCard({ note, onDelete }) {
return (
<div className="card">
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
<strong>{note.title}</strong>
<button className="btn btn-danger" onClick={() => onDelete(note._id)}>Delete</button>
</div>
{note.content && <p className="small" style={{ marginTop: 6 }}>{note.content}</p>}
</div>
);
}