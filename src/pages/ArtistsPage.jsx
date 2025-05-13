import { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";

const apiUrl = import.meta.env.VITE_API_URL;

function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtists();
  }, [filter]);

  
  const getArtists = () => {
    setLoading(true);
    let query = `${apiUrl}/artists`;
    if (filter) {
      query += `?query=${encodeURIComponent(filter)}`;
    }

    axios.get(query)
      .then(res => {
        setArtists(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore nel caricamento degli artisti:", err);
        setLoading(false);
      });
  };


  return (
    <div className="container py-5 text-white">
      <h2 className="mb-4 text-center bg-card py-3 rounded shadow-sm">Artisti</h2>

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
        <div className="text-white text-center mt-5">
          <div className="spinner-border text-light" role="status" />
          <p className="mt-3">Caricamento artisti...</p>
        </div>
      ) : artists.length === 0 ? (
        <div className="text-center text-danger mt-5">
          <h4>Nessun artista trovato</h4>
        </div>
      ) : (
        <div className="row">
          {artists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ArtistsPage;
