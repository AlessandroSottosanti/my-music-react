import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function SongDetailsPage() {
    const { id } = useParams();
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        getSong();
    }, [id]);

    const getSong = () => {
        axios.get(`${apiUrl}/songs/${id}`)
            .then(response => {
                setSong(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Errore nel caricamento della canzone.");
                setLoading(false);
            });
    }

    if (loading) {
        return <div className="text-white text-center mt-5">Caricamento...</div>;
    }

    if (error) {
        return <div className="text-danger text-center mt-5">{error}</div>;
    }

    if (!song) {
        return <div className="text-white text-center mt-5">Canzone non trovata.</div>;
    }

    return (
        <div className="container py-5 text-white">
            <div className="row">
                <div className="col-md-4">
                    <div className="position-relative song-image-container" onClick={() => window.open(song.songUrlYt, "_blank", "noopener,noreferrer")}>
                        <img
                            src={song.albumCoverUrl}
                            alt={song.albumTitle}
                            className="img-fluid rounded shadow song-image"
                        />
                        <div className="overlay d-flex justify-content-center align-items-center">
                            <i className="fa-solid fa-play fa-3x text-white"></i>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <h2>{song.title}</h2>
                    <p><strong>Artista:</strong> {song.artistNames.join(", ")}</p>
                    <p><strong>Album:</strong> {song.albumTitle}</p>
                    <p><strong>Genere:</strong> {song.genreNames.join(", ")}</p>
                    <p><strong>Durata:</strong> {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')} min</p>
                    <p><strong>Anno:</strong> {new Date(song.albumReleaseDate).getFullYear()}</p>
                    <p><a target="_blank" href={song.songUrlYt} className="btn btn-danger"><i className="fa-brands fa-youtube"></i> Ascolta su YouTube</a></p>
                </div>
            </div>
        </div>
    );
}

export default SongDetailsPage;
