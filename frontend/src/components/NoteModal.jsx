import { useState } from 'react';

const NoteModal = ({ onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [body, setBody] = useState(initialData?.body ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default browser refresh
    setError('');
    setLoading(true);

    try {
      await onSubmit({ title, body });
    } catch (err) {
      setError(err.response?.data?.msg || 'Error saving note.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl">
        <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50 via-white to-slate-50 px-7 py-6">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 className="mb-1 text-xl font-bold tracking-tight text-slate-900">
            {initialData ? 'Edit Note' : 'Create New Note'}
          </h2>
          <p className="text-sm text-slate-500">
            {initialData ? 'Make changes to your note.' : 'Capture a thought to keep it organized.'}
          </p>
        </div>

        <div className="p-7">
          {error && (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100"
              />
            </div>

            <div className="mb-7">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter note content..."
                rows="4"
                required
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-900 placeholder:text-slate-400 transition focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Create Note'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;