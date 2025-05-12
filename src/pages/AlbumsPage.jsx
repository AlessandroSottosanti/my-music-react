import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AlbumCard from "../components/AlbumCard";

const apiUrl = import.meta.env.VITE_API_URL;

function AlbumsPage() {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAlbums();
    }, []);

    const getAlbums = () => {
        axios.get(`${apiUrl}/albums`)
            .then(res => {
                setAlbums(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Errore nel caricamento degli album:", err);
                setLoading(false);
            });
    }

    if (loading) return <div className="text-white text-center mt-5">Caricamento album...</div>;

    return (
        <div className="container py-5 text-white">
            <h2 className="mb-4">Album</h2>
            <div className="row">
                {albums.map(album => (
                    <div key={album.id} className="col-md-4 mb-4">
                        <AlbumCard album={album} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AlbumsPage;
