import React, { useState, useEffect } from 'react';
import API from '../api/axiosInstance';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';

const Dashboard = ({ userName, userId }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const currentUserId = userId || localStorage.getItem('userID');
  const currentUserName = userName || localStorage.getItem('userName') || 'User';

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await API.get('/note');
      setNotes(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to load notes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateOrUpdate = async (noteData) => {
    try {
      if (editingNote) {
        await API.patch(`/note/update/${editingNote._id}`, noteData);
      } else {
        await API.post('/note/create', noteData);
      }
      setIsModalOpen(false);
      setEditingNote(null);
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.msg || 'Operation failed.');
    }
  };

  const handleDelete = async (noteId) => {
    try {
      await API.delete(`/note/delete/${noteId}`);
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to delete note.');
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100/70 via-sky-50 to-purple-100/60 min-h-screen p-4 md:p-8 text-slate-900">
      <main className="bg-[#F8FAFC] border border-white/60 rounded-3xl p-6 md:p-10 shadow-xl max-w-7xl mx-auto">
        <section
          aria-label={`Welcome back, ${currentUserName}`}
          className="bg-sky-50/80 border border-sky-200/80 rounded-3xl p-6 md:p-10 shadow-xs mb-10 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-sky-700/80 text-[11px] font-semibold uppercase tracking-widest mb-2 block">
                - YOUR WORKSPACE DASHBOARD
              </span>
              <h1 className="text-3xl md:text-4xl font-normal text-slate-900 tracking-tight leading-snug mb-3">
                The best way to organize your ideas.
              </h1>
              <p className="text-slate-600 text-sm md:text-base font-normal leading-relaxed mb-8 max-w-md">
                Capture thoughts, manage notes, and collaborate effortlessly across your personal and shared workspace.
              </p>
            </div>
            <div className="mx-auto flex w-full max-w-[260px] items-center justify-center rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs">
              <img
                src="https://www.adobe.com/uk/acrobat/resources/media_11ed4b8d90d0912137581057498ae4b02f9143eac.png?width=1200&format=pjpg&optimize=medium"
                alt="Aesthetic Notebook Workspace"
                className="h-36 max-h-40 w-full object-contain"
              />
            </div>
          </div>
        </section>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setError('')}
              className="font-bold text-red-700 hover:text-red-900 ml-4 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Notes Control Header */}
        <div id="available-notes" className="flex items-center justify-between gap-4 py-3 mb-6 scroll-mt-8">
          <div className="flex items-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
              Available Notes
            </h2>
          </div>

          <button
            onClick={() => {
              setEditingNote(null);
              setIsModalOpen(true);
            }}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            Create Note
          </button>
        </div>

        {/* Note Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-500 font-medium text-sm">
            Loading your notes...
          </div>
        ) : notes.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center max-w-md mx-auto my-8">
            <h3 className="font-bold text-slate-900 text-base mb-1">
              No notes found
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              Get started by creating your very first note!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {notes.map((note, index) => (
              <NoteCard
                key={note._id || index}
                note={note}
                currentUserId={currentUserId}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <NoteModal
          isOpen={isModalOpen}
          initialData={editingNote}
          onClose={() => {
            setIsModalOpen(false);
            setEditingNote(null);
          }}
          onSubmit={handleCreateOrUpdate}
        />
      )}
    </div>
  );
};

export default Dashboard;