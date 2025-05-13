import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SongCard from "../components/SongCard";

const apiUrl = import.meta.env.VITE_API_URL;

function SongsPage() {
    const [songs, setSongs] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const getSongs = () => {
        setLoading(true);  // Inizia il loading

        let query = `${apiUrl}/songs`;
        if (filter) {
            query += `?query=${encodeURIComponent(filter)}`;
        }

        axios
            .get(query)
            .then(response => {
                setSongs(response.data);
                setLoading(false);  // Fine loading
            })
            .catch(error => {
                console.error("Errore nel recupero delle canzoni:", error);
                setLoading(false);  // Anche in caso di errore, fermare loading
            });
    };

    useEffect(() => {
        getSongs();
    }, [filter]);

    const handleCardClick = (songId) => {
        navigate(`/songs/${songId}`);
    };

    return (
        <main className=" container flex-grow-1 pt-5 text-white">
            <div className="d-flex justify-content-center bg-card rounded mb-4 py-3">
                <h1>Lista canzoni:</h1>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary text-center"
                    placeholder="🔍"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="d-flex flex-column align-items-center mt-5">
                    <div className="spinner-border text-light" role="status" />
                    <p className="mt-3">Caricamento canzoni...</p>
                </div>
            ) : songs.length === 0 ? (
                <div className="text-center text-danger mt-5">
                    <h4>Nessuna canzone trovata</h4>
                </div>
            ) : (
                <div className="row">
                    {songs.map((song) => (
                        <div
                            key={song.id}
                            className="col-12 col-sm-6 col-md-4 col-xl-3 col-xxxl-2 mb-4 my-3 d-flex justify-content-center"
                        >
                            <SongCard song={song} handleCardClick={handleCardClick} />
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

export default SongsPage;
