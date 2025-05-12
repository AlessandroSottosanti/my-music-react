import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SongCard from "../components/SongCard";
const apiUrl = import.meta.env.VITE_API_URL;

function SongsPage() {
    const [songs, setSongs] = useState([]);
    const [filter, setFilter] = useState("");

    const navigate = useNavigate();

    const getSongs = () => {
        let query = `${apiUrl}/songs?`;

        if (filter) query += `query=${encodeURIComponent(filter)}`;

        console.log(query);
        return axios
            .get(query)
            .then(response => {
                console.log("Dati ricevuti:", response.data);
                setSongs(response.data);
            })
            .catch(error => {
                console.error("Errore nel recupero delle canzoni:", error);
                throw error;
            });
    };

    useEffect(() => {
        getSongs();
    }, [filter]);

    const handleCardClick = (songId) => {
        navigate(`/songs/${songId}`);
    };

    console.log("Canzoni:", songs);

    return (
        <main className="mx-5 flex-grow-1 pt-5 text-white">
            <span className="d-flex justify-content-center rounded bg-card mb-5 py-3"><h1>Lista canzoni:</h1></span>
    
            {songs.length === 0 ? (
                <div className="container d-flex justify-content-center mt-5 p-3 rounded bg-danger text-white">
                    <h3>Nessuna canzone trovata</h3>
                </div>
            ) : (
                <div className="row mx-5 ">
                    {songs.map((song) => (
                        <div key={song.id} className="col-12 col-sm-6 col-md-4 col-xl-3 col-xxxl-2 mb-4 my-3 d-flex justify-content-center ">
                            <SongCard song={song} handleCardClick={handleCardClick} />
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
    
}

export default SongsPage;