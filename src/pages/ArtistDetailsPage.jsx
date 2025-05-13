import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AlbumCard from "../components/AlbumCard";

const apiUrl = import.meta.env.VITE_API_URL;

function ArtistDetailsPage() {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
        navigate(`/albums/${albumId}`);
    };

    if (loading) return <div className="text-white text-center mt-5">Caricamento...</div>;
    if (error) return <div className="text-danger text-center mt-5">{error}</div>;
    if (!artist) return <div className="text-white text-center mt-5">Artista non trovato.</div>;

    return (
        <div className="container py-5 text-white">
            <div className="row mb-4 align-items-center">
                <div className="col-md-4">
                    <img src={artist.imageUrl} alt={artist.name} className="img-fluid rounded shadow" />
                </div>
                <div className="col-md-8 mt-3 description">
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
                <h4 className="mb-3 description text-center">Album</h4>
                {artist.albums && artist.albums.length > 0 ? (
                    <div className="row">
                        {artist.albums.map(album => (
                            <div key={album.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                                <AlbumCard album={album} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-muted">Nessun album disponibile.</div>
                )}
            </div>

        </div>
    );
}

export default ArtistDetailsPage;
