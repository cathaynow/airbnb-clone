import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDate from "../components/BookingDate";

export default function SingleBookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/booking").then((res) => {
        const foundBooking = res.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="block my-2">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">호텔 예약정보: </h2>
          <BookingDate booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>숙박 가격</div>
          <div className="text-3xl">{booking.price}원</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
