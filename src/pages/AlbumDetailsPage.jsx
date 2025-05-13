import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function AlbumDetailsPage() {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        getAlbum();
        getAlbumSongs();
    }, [id]);

    const getAlbum = () => {
        axios.get(`${apiUrl}/albums/${id}`)
            .then(res => {
                setAlbum(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Errore nel caricamento dell'album.");
                setLoading(false);
            });
    }

    const getAlbumSongs = () => {
        axios.get(`${apiUrl}/songs/album/${id}`)
            .then(res => {
                setSongs(res.data);
            })
            .catch(() => {
                setError("Errore nel caricamento delle canzoni");
                setLoading(false);
            })
    }

    if (loading) return <div className="text-white text-center mt-5">Caricamento...</div>;
    if (error) return <div className="text-danger text-center mt-5">{error}</div>;
    if (!album) return <div className="text-white text-center mt-5">Album non trovato.</div>;

    return (
        <div className="container py-5 text-white">
            <div className="row align-items-center">
                <div className="col-md-4 ">
                    <img src={album.coverUrl} alt={album.title} className="img-fluid rounded shadow" />
                </div>
                <div className="col-md-8 mt-3 description">
                    <h2>{album.title}</h2>
                    <p><strong>Artista:</strong> {album.artistNames.join(", ")}</p>
                    <p><strong>Genere: </strong>
                    {album.genreNames.map((g, idx) => (
                        <span key={idx} className="badge bg-secondary me-1">{g}</span>
                    ))}</p>
                    <p><strong>Anno:</strong> {new Date(album.releaseDate).getFullYear()}</p>
                    <p><strong>Descrizione:</strong> {album.description}</p>
                </div>
            </div>

            {/* Lista canzoni */}
            <div className="my-5">
                <h4 className="description text-center mb-3">Tracce</h4>
                {songs.length === 0 ? (
                    <p>Nessuna canzone trovata per questo album.</p>
                ) : (
                    <ul className="list-group list-group-flush">
                        {songs.map(song => (
                            <li
                                key={song.id}
                                className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center hover bg-card rounded mb-2"
                                onClick={() => window.open(song.songUrlYt, "_blank")}
                                
                            >
                                {song.title}
                                <small>{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')} min</small>
                            </li>
                        ))}
                    </ul>

                )}
            </div>
        </div>


    );
}

export default AlbumDetailsPage;
 