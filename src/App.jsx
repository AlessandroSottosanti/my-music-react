import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AppLayout from "./components/AppLayout"
import { AlertProvider } from "./contexts/AlertContext"
import SongsPage from "./pages/SongsPage"
import SongDetailsPage from "./pages/SongDetailsPage"
import AlbumsPage from "./pages/AlbumsPage"
import AlbumDetailsPage from "./pages/AlbumDetailsPage"
import ArtistDetailsPage from "./pages/ArtistDetailsPage"
import ArtistsPage from "./pages/ArtistsPage"


function App() {

  return (
    <>
      <BrowserRouter>
        <AlertProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path={`/songs`} element={<SongsPage />} />
              <Route path={`/songs/:id`} element={<SongDetailsPage />} />
              <Route path={`/albums`} element={<AlbumsPage />} />
              <Route path={`/albums/:id`} element={<AlbumDetailsPage />} />
              <Route path={`/artists`} element={<ArtistsPage />} />
              <Route path={`/artists/:id`} element={<ArtistDetailsPage />} />
            </Route>

          </Routes>
        </AlertProvider>

      </BrowserRouter>
    </>
  )
}

export default App
