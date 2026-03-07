import createHttpError from "http-errors";
import { Notes } from "../models/note.js";


// Отримати список нотаток
export const getAllNotes = async (req, res) => {
  const notes = await Notes.find();
  res.status(200).json(notes);
};

// Отримати одну нотатку за id
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Notes.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};


export const createNote = async (req, res) => {
    const note = await Notes.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Notes.findOneAndDelete({
    _id: noteId,
  });

  if (!note) {
    throw createHttpError(404, "Student not found");
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Notes.findOneAndUpdate(
    { _id: noteId }, // Шукаємо по id
    req.body,
    { new: true }, // повертаємо оновлений документ
  );

  if (!note) {
	throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(note);
};
