import { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";  // Importa il nuovo componente

const apiUrl = import.meta.env.VITE_API_URL;

function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${apiUrl}/artists`)
      .then(res => {
        setArtists(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore nel caricamento degli artisti:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white text-center mt-5">Caricamento artisti...</div>;

  return (
    <div className="container py-5 text-white">
      <h2 className="mb-4">Artisti</h2>
      <div className="row">
        {artists.map(artist => (
          <ArtistCard key={artist.id} artist={artist} />  // Usa il componente ArtistCard
        ))}
      </div>
    </div>
  );
}

export default ArtistsPage;
