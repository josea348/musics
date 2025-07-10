import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function UploadMusic() {
  const [music, setMusic] = useState([]);
  const [form, setForm] = useState({
    title: '',
    artist: '',
    genre: '',
    file: null,
  });
  // Estado para manejar el archivo de audio seleccionado para la vista previa
  const [audioPreviewUrl, setAudioPreviewUrl] = useState(null); 

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setForm({
      ...form,
      [name]: name === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
    console.log(form);
    console.log(formData);

    // Aquí iría la lógica para enviar a una API o backend
    try {
      const response = await axios.post('/api/api/music', formData);
      console.log(response.data);
      setForm({
        title: '',
        artist: '',
        genre: '',
        file: null
      });
      Swal.fire({
        title: "Registrado!",
        text: response.data.message,
        icon: "success"
      });
    } catch (e) {
      console.log('Error: ' + e);
      console.log('Error: ' + e.message);
      Swal.fire({
        title: "Error!",
        text: 'Error: ' + e,
        icon: "error"
      });
    }
    // alert('Música subida correctamente');
  };

  const getMusic = async () => {
    try {
      const response = await axios.get('/api/api/music');
      setMusic(response.data);
      console.log(response.data);
    } catch (e) {
      console.log('Error: ' + e);
      console.log('Error: ' + e.message);
    }
  };

  useEffect(() => {
    getMusic();
    // Limpieza de URLs de objeto cuando el componente se desmonta
    return () => {
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }
      music.forEach(item => {
        if (item.fileUrl) { // Asumiendo que guardas una URL de objeto si la generas en getMusic
          URL.revokeObjectURL(item.fileUrl);
        }
      });
    };
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">🎵 Subir Música <edit /></h2>

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
            className="w-full mb-4 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          {/* Vista previa de audio para el archivo seleccionado */}
          {audioPreviewUrl && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Previsualización de audio:</p>
              <audio controls src={audioPreviewUrl} className="w-full"></audio>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Subir Canción
          </button>
        </form>
        <div className="w-full bg-gray-100 flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">🎧 Música Disponible</h2>
          {music.map((items) => (
            <div key={items.id} className='w-full bg-white m-2 border p-2 rounded mb-4 flex flex-row'>
              <div className='w-[60%]'>
                <p>{items.title}</p>
                <p>{items.artist}</p>
                <audio controls src={`api/music/${items.file}`} />
              </div>
              <div className='grid grid-cols-2'>
                <button size="sm" color="primary" className="m-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Edit</button>
                <button size="sm" color="danger" className="m-2 bg-red-600 text-white p-2 rounded hover:bg-red-700">Delete</button>
                <button size="sm" color="danger" className="m-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Update</button>
                <button size="sm" color="danger" className="m-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Download</button>
                {/* <button size="sm" color="primary" className="mx-2"><FaEdit /></button>
                <button size="sm" color="danger" className="mx-2"><AiFillDelete /></button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
