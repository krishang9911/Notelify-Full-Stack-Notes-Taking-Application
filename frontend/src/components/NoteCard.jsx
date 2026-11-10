const NoteCard = ({ note, currentUserId, index = 0, onEdit, onDelete, handleEdit, handleDelete }) => {
  const editHandler = onEdit || handleEdit;
  const deleteHandler = onDelete || handleDelete;

  // Strict ownership check
  const noteAuthorId =
    note.userID?._id ||
    note.userID ||
    note.userId?._id ||
    note.userId ||
    note.authorId;
  const isOwner = Boolean(
    currentUserId &&
      noteAuthorId &&
      currentUserId.toString() === noteAuthorId.toString()
  );

  const authorName =
    typeof note.userID === 'object' && note.userID?.name
      ? note.userID.name
      : typeof note.userId === 'object' && note.userId?.name
        ? note.userId.name
      : note.authorName || 'Another User';

  const colorThemes = [
    'bg-sky-400 border-sky-300',
    'bg-amber-400 border-amber-300',
    'bg-rose-400 border-rose-300',
    'bg-emerald-400 border-emerald-300',
    'bg-indigo-400 border-indigo-300',
  ];

  const theme = colorThemes[index % colorThemes.length];

  return (
    <article className={`${theme} rounded-2xl p-5 md:p-6 border shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-auto min-h-[160px]`}>
      <div className="mb-3 flex items-start justify-end">
        {isOwner ? (
          <span className="bg-white/20 border border-white/30 text-white font-semibold text-[11px] rounded-full px-3 py-1 backdrop-blur-xs shadow-xs">
            Your Note
          </span>
        ) : (
          <span className="bg-white/20 border border-white/30 text-white font-semibold text-[11px] rounded-full px-3 py-1 backdrop-blur-xs shadow-xs">
            Read Only (Created by {authorName})
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="flex items-center gap-2 mb-2">
            <span className="text-white/70 text-[10px] font-extrabold tracking-widest shrink-0 select-none mr-2">
              TITLE:
            </span>
            <span className="text-white font-bold text-base inline line-clamp-1">
              {note.title}
            </span>
          </h3>
          <div className="flex items-start gap-2 mb-4">
            <span className="text-white/70 text-[10px] font-extrabold tracking-widest shrink-0 select-none mr-2">
              BODY:
            </span>
            <p className="text-white/95 text-xs font-medium leading-relaxed whitespace-pre-wrap line-clamp-4 inline">
              {note.content || note.description || note.body}
            </p>
          </div>
        </div>

        {isOwner && (
          <div className="pt-3 border-t border-white/20 flex justify-end gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => editHandler(note)}
                className="bg-white/20 hover:bg-white/30 border border-white/30 text-white text-xs font-medium px-4 py-2 rounded-xl backdrop-blur-xs cursor-pointer transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => deleteHandler(note._id)}
                className="bg-white/20 hover:bg-white/30 border border-white/30 text-white text-xs font-medium px-4 py-2 rounded-xl backdrop-blur-xs cursor-pointer transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        )}
        {!isOwner && (
          <div className="pt-3 border-t border-white/20 flex justify-end gap-2">
            <button
              type="button"
              disabled
              className="bg-white/20 border border-white/30 text-white/80 text-xs font-medium px-4 py-2 rounded-xl cursor-not-allowed"
            >
              Read only
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default NoteCard;