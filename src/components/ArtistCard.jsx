import { Link } from "react-router-dom";

function ArtistCard({ artist }) {
    return (
        <div className="col-md-4 mb-4">
            <Link to={`/artists/${artist.id}`} className="text-decoration-none text-white">
                <div className="card bg-card text-white h-100 shadow border-0">
                    <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="card-img-top"
                        style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{artist.name}</h5>
                        {artist.genreNames?.length > 0 && (
                            <p className="card-text text-muted">{artist.genreNames.join(", ")}</p>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ArtistCard;
