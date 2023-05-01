import { useState } from "react";

export default function PlaceGllery({ place }) {
  const [showPhoto, setShowPhoto] = useState(false);

  if (showPhoto) {
    return (
      <div className="absolute inset-0 fixed bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
            <button
              onClick={() => setShowPhoto(false)}
              className="fixed right-12 top-9 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              닫기
            </button>
          </div>
          {place?.photo?.length > 0 &&
            place.photo.map((photo) => (
              <div key={place._id}>
                <img
                  onClick={() => setShowPhoto(true)}
                  src={"http://localhost:4000/uploads/" + photo}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {place.photo?.[0] && (
            <div>
              <img
                onClick={() => setShowPhoto(true)}
                className="aspect-square cursor-pointer object-cover"
                src={"http://localhost:4000/uploads" + place.photo[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid">
          {place.photo?.[1] && (
            <img
              onClick={() => setShowPhoto(true)}
              className="aspect-square cursor-pointer object-cover"
              src={"http://localhost:4000/uploads" + place.photo[1]}
              alt=""
            />
          )}
          <div className="overflow-hidden">
            {place.photo?.[2] && (
              <img
                onClick={() => setShowPhoto(true)}
                className="aspect-square cursor-pointer object-cover relative top-2"
                src={"http://localhost:4000/uploads" + place.photo[2]}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowPhoto(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        추가 사진
      </button>
    </div>
  );
}
