import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function ArtistDetailsPage() {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        getArtist();
    }, [id]);

    const getArtist = () => {
        axios.get(`${apiUrl}/artists/${id}`)
            .then(res => {
                setArtist(res.data);
            })
            .catch(err => {
                console.error("Errore nel caricamento dell'artista:", err);
                setError("Errore nel caricamento dei dati dell'artista.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleAlbumClick = (albumId) => {
        // Gestisce il click sull'album e fa la navigazione (puoi anche gestire il routing in modo diverso)
        window.location.href = `/albums/${albumId}`;  // Modifica questa logica se utilizzi React Router
    };

    if (loading) return <div className="text-white text-center mt-5">Caricamento...</div>;
    if (error) return <div className="text-danger text-center mt-5">{error}</div>;
    if (!artist) return <div className="text-white text-center mt-5">Artista non trovato.</div>;

    return (
        <div className="container py-5 text-white">
            <div className="row mb-4">
                <div className="col-md-4">
                    <img src={artist.imageUrl} alt={artist.name} className="img-fluid rounded shadow" />
                </div>
                <div className="col-md-8 mt-3">
                    <h2>{artist.name}</h2>
                    {artist.genreNames?.length > 0 && (
                        <p><strong>Generi:</strong> {artist.genreNames.join(", ")}</p>
                    )}
                    {artist.biography && (
                        <p className="mt-3"><strong>Biografia:</strong> {artist.biography}</p>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <h4>Album</h4>
                <ul className="list-group list-group-flush">
                    {artist.albums?.map((album) => (
                        <li
                            key={album.id}
                            className="list-group-item bg-dark text-white bg-card rounded hover mb-3"
                            onClick={() => handleAlbumClick(album.id)}  // Gestisci il click sull'album
                        >
                            {album.title} - {album.releaseDate.split('-')[0]} {/* Mostra solo l'anno */}
                        </li>
                    ))}
                    {(!artist.albums || artist.albums.length === 0) && (
                        <li className="list-group-item bg-dark text-muted">Nessun album disponibile.</li>
                    )}
                </ul>
            </div>

        </div>
    );
}

export default ArtistDetailsPage;
