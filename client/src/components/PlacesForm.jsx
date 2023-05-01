import { useState, useEffect } from "react";
import Perks from "./Perks";
import ImagesUploader from "./ImagesUploader";
import axios from "axios";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesForm() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState("");
  const [desc, setDesc] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setextraInfo] = useState("");
  const [checkIn, setcheckIn] = useState(14);
  const [checkOut, setcheckOut] = useState(11);
  const [maxGuests, setmaxGuests] = useState(4);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((res) => {
      const { data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photo);
      setDesc(data.desc);
      setPerks(data.perks);
      setextraInfo(data.extraInfo);
      setcheckIn(data.checkIn);
      setcheckOut(data.checkOut);
      setmaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-md mt-4">{text}</h2>;
  }

  function inputDesc(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, desc) {
    return (
      <>
        {inputHeader(header)}
        {inputDesc(desc)}
      </>
    );
  }

  async function saveDevice(e) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      desc,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // update
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // new post
      await axios.post("/places", {
        ...placeData,
      });
    }
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={saveDevice}>
        {preInput("호텔명", "")}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {preInput("주소", "")}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {preInput("사진", "")}
        <ImagesUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("설명", "")}
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        {preInput("부가서비스", "")}
        <div className="gap-2 mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("추가 정보", "")}
        <textarea
          value={extraInfo}
          onChange={(e) => setextraInfo(e.target.value)}
        />
        <h2 className="text-md mt-4">체크인 정보</h2>
        <div className="gap-2 grid sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">체크인 타임</h3>
            <input
              type="text"
              placeholder="14"
              value={checkIn}
              onChange={(e) => setcheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">체크아웃 타임</h3>
            <input
              type="text"
              placeholder="11"
              value={checkOut}
              onChange={(e) => setcheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">최대 투숙</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setmaxGuests(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">가격</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-4 ">
          저장
        </button>
      </form>
    </div>
  );
}
