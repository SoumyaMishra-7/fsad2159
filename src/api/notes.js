import axios from "axios";

const API_URL = "https://fsad2159.onrender.com/api/notes"; // backend URL

// GET all notes
export const getNotes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// POST a new note
export const createNote = async (note) => {
  const response = await axios.post(API_URL, note);
  return response.data;
};

// PUT update a note
export const updateNote = async (id, note) => {
  const response = await axios.put(`${API_URL}/${id}`, note);
  return response.data;
};

// DELETE a note
export const deleteNote = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
