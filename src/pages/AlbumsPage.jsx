import { useEffect, useState } from "react";
import axios from "axios";
import AlbumCard from "../components/AlbumCard";

const apiUrl = import.meta.env.VITE_API_URL;

function AlbumsPage() {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");

    const getAlbums = () => {
        setLoading(true);

        let url = `${apiUrl}/albums`;
        if (filter) {
            url += `?query=${encodeURIComponent(filter)}`;
        }

        axios.get(url)
            .then(res => {
                setAlbums(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Errore nel caricamento degli album:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        getAlbums();
    }, [filter]);

    const groupAlbumsByArtist = (albumsList) => {
        const groups = {};
        albumsList.forEach(album => {
            album.artistNames.forEach(artist => {
                if (!groups[artist]) groups[artist] = [];
                groups[artist].push(album);
            });
        });
        return groups;
    };


    return (
        <div className="container py-5 text-white">
            <h2 className="mb-4 text-center bg-card py-3 rounded shadow-sm">Album</h2>

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
                    <p className="mt-3">Caricamento album...</p>
                </div>
            ) : albums.length === 0 ? (
                <div className="text-center text-danger mt-5">
                    <h4>Nessun album trovato</h4>
                </div>
            ) : (
                <div className="row">
                    {Object.entries(groupAlbumsByArtist(albums)).map(([artistName, albums]) => (
                        <div key={artistName} className="mb-5">
                            <h4 className=" p-2 description">{artistName}</h4>
                            <div className="row">
                                {albums.map(album => (
                                    <div key={album.id} className="col-md-4 mb-4">
                                        <AlbumCard album={album} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}

export default AlbumsPage;
