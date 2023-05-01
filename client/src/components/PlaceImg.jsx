export default function PlactImg({ place, index = 0, className = null }) {
  if (!place.photo?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return (
    <img
      className={className}
      src={"http://localhost:4000/uploads" + place.photo[index]}
      alt=""
    />
  );
}
