import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import PlacePage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    alert("로그아웃 되었습니다");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect === "/") {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full max-w-sm mt-2"
          >
            Loggout
          </button>
        </div>
      )}
      {subpage === "places" && (
        <div>
          <PlacePage />
        </div>
      )}
      {subpage === "booking" && <div></div>}
    </div>
  );
}
