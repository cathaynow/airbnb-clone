import { useState, useEffect } from "react";
import Perks from "./Perks";
import ImagesUploader from "./ImagesUploader";
import axios from "axios";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function DevicesForm() {
  const { id } = useParams();
  const [eqpid, setEqpId] = useState("");
  const [eqppt, setEqpPt] = useState("");
  const [eqpnm, setEqpNm] = useState("");
  const [eqplc, setEqpLc] = useState("");
  const [eqpmg, setEqpMg] = useState("");
  const [eqpop, setEqpOp] = useState("");
  const [swnm, setSwNm] = useState("");
  const [swlc, setSwLc] = useState("");
  const [swpt, setSwPt] = useState("");
  const [swty, setSwTy] = useState("");
  const [swst, setSwSt] = useState("");
  const [addedPhotos, setAddedPhotos] = useState("");
  const [desc, setDesc] = useState("");
  const [perks, setPerks] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((res) => {
      const { data } = res;
      setEqpId(data.eqpid);
      setEqpPt(data.eqppt);
      setEqpNm(data.eqpnm);
      setEqpLc(data.eqplc);
      setEqpMg(data.eqpmg);
      setEqpOp(data.eqpop);
      setSwNm(data.swnm);
      setSwLc(data.swlc);
      setSwPt(data.swpt);
      setSwTy(data.swty);
      setSwSt(data.swst);
      setAddedPhotos(data.photo);
      setDesc(data.desc);
      setPerks(data.perks);
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
      eqpid,
      eqppt,
      eqpnm,
      eqplc,
      eqpmg,
      eqpop,
      swnm,
      swlc,
      swpt,
      swty,
      swst,
      addedPhotos,
      desc,
      perks,
    };
    if (id) {
      // update
      await axios.put("/devices", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // new post
      await axios.post("/devices", {
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
        {preInput("구성ID", "")}
        <input
          type="text"
          value={eqpid}
          onChange={(e) => setEqpId(e.target.value)}
        />
        {preInput("부처명", "")}
        <input
          type="text"
          value={eqppt}
          onChange={(e) => setEqpPt(e.target.value)}
        />
        {preInput("구성자원명", "")}
        <input
          type="text"
          value={eqpnm}
          onChange={(e) => setEqpNm(e.target.value)}
        />
        {preInput("설치좌표", "")}
        <input
          type="text"
          value={eqplc}
          onChange={(e) => setEqpLc(e.target.value)}
        />
        {preInput("담당자", "")}
        <input
          type="text"
          value={eqpmg}
          onChange={(e) => setEqpMg(e.target.value)}
        />
        {preInput("운영자", "")}
        <input
          type="text"
          value={eqpop}
          onChange={(e) => setEqpOp(e.target.value)}
        />
        {preInput("스위치명", "")}
        <input
          type="text"
          value={swnm}
          onChange={(e) => setSwNm(e.target.value)}
        />
        {preInput("스위치좌표", "")}
        <input
          type="text"
          value={swlc}
          onChange={(e) => setSwLc(e.target.value)}
        />
        {preInput("스위치포트", "")}
        <input
          type="text"
          value={swpt}
          onChange={(e) => setSwPt(e.target.value)}
        />
        {preInput("연결타입", "")}
        <input
          type="text"
          value={swty}
          onChange={(e) => setSwTy(e.target.value)}
        />
        {preInput("사진", "")}
        <ImagesUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("설명", "")}
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        {preInput("전산실", "")}
        <div className="gap-2 mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-4 ">
          저장
        </button>
      </form>
    </div>
  );
}
