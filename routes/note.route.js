const express = require("express");
const noteRouter = express.Router();
const { NoteModel } = require("../model/note.model");
const { UserModel } = require("../model/user.model");

// Convert IDs to strings so MongoDB ObjectIds and string IDs compare equally.
const isNoteOwner = (note, userId) => note.userID.toString() === userId.toString();

// Show every note and include its author's name for the read-only label.
noteRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.find();
        const users = await UserModel.find({
            _id: { $in: notes.map((note) => note.userID) }
        }).select("name");

        // A map lets us find each author's name without querying once per note.
        const userNames = new Map(users.map((user) => [user._id.toString(), user.name]));
        return res.json(notes.map((note) => ({
            ...note.toObject(),
            authorName: userNames.get(note.userID.toString()) || "Unknown user"
        })));
    } catch (error) {
        return res.status(500).json({msg: "Cannot fetch notes", error: error.message});
    }
});

// The auth middleware adds the logged-in user's ID before this route runs.
noteRouter.post("/create", async (req, res) => {
    try {
        const newNote = new NoteModel(req.body);
        await newNote.save()
        return res.send({msg: "Note created successfully"});
    } catch (error) {
        return res.send({msg: "Something went wrong"});
    };
});

// Only the note's author can update its title or body.
noteRouter.patch("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const note = await NoteModel.findById(id);
        if (!note) {
            return res.status(404).json({ msg: "Note Not Found" });
        }

        // The middleware supplies the logged-in user's verified ID.
        if (!isNoteOwner(note, req.userId || req.body.userID)) {
            return res.status(403).json({ msg: "You are not authorized to update this note" });
        }

        const { title, body } = req.body;
        await NoteModel.findByIdAndUpdate(id, { title, body }, { runValidators: true });
        return res.json({ msg: `Note with id ${id} updated successfully` });
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
});

// Only the note's author can delete it.
noteRouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const note = await NoteModel.findById(id);
        if (!note) {
            return res.status(404).json({ msg: "Note not found" });
        }

        // Reject deletion when this note belongs to a different user.
        if (!isNoteOwner(note, req.userId || req.body.userID)) {
            return res.status(403).json({ msg: "You are not authorized to delete this note" });
        }

        await NoteModel.findByIdAndDelete(id);
        return res.json({ msg: "Note deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
});

module.exports = {noteRouter};