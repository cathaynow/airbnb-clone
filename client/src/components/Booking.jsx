import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Booking({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guest, setGuest] = useState(1);
  const [myname, setMyName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setMyName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookingHandler() {
    const res = await axios.post("/booking", {
      checkIn,
      checkOut,
      guest,
      myname,
      mobile,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = res.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        가격: {place.price.toLocaleString()} / 일
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>체크인 : </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>체크아웃 : </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="py-3 px-4 border-t">
            <label>인원 : </label>
            <input
              type="number"
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
            />
          </div>
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>예약자 이름 : </label>
            <input
              type="text"
              value={myname}
              onChange={(e) => setMyName(e.target.value)}
            />
            <label>휴대폰 : </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        )}
      </div>
      <button
        onClick={bookingHandler}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-2xl mt-4"
      >
        Book this place&nbsp;
        {numberOfNights > 0 && (
          <>
            <span>{numberOfNights * place.price}</span>
          </>
        )}
      </button>
    </div>
  );
}
