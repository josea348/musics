import React, { useState } from 'react'

export default function UploadMusic() {
    const [form, setForm] = useState({
        title: '',
        artist: '',
        genre: '',
        file: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({
            ...form,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        // Aquí iría la lógica para enviar a una API o backend
        alert('Música subida correctamente');
    };
    
  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4 text-center">🎵 Subir Música</h2>

              <label className="block mb-2">Nombre de la canción</label>
              <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  className="w-full border p-2 rounded mb-4"
                  required
              />

              <label className="block mb-2">Artista</label>
              <input
                  type="text"
                  name="artist"
                  onChange={handleChange}
                  className="w-full border p-2 rounded mb-4"
                  required
              />

              <label className="block mb-2">Género</label>
              <input
                  type="text"
                  name="genre"
                  onChange={handleChange}
                  className="w-full border p-2 rounded mb-4"
              />

              <label className="block mb-2">Archivo de audio (mp3)</label>
              <input
                  type="file"
                  name="file"
                  accept="audio/*"
                  onChange={handleChange}
                  className="w-full mb-4"
                  required
              />

              <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                  Subir Canción
              </button>
          </form>
      </div>
  )
}
