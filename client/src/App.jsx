import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import RegisterPage from "./pages/RegisterPage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PlacePage from "./pages/PlacesPage";
import PlacesForm from "./components/PlacesForm";
import SinglePlace from "./pages/SinglePlace";
import MyBookingPage from "./pages/MyBookingPage";
import SingleBookingPage from "./pages/SingleBookingPage";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacePage />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/:id" element={<PlacesForm />} />
          <Route path="/place/:id" element={<SinglePlace />} />
          <Route path="/account/bookings" element={<MyBookingPage />} />
          <Route path="/account/bookings/:id" element={<SingleBookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
