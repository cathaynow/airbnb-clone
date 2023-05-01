import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(null);

  async function registerHandler(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        phone,
        email,
        password,
      });
      // alert("성공적으로 등록되었습니다.");
      setRedirect("/");
    } catch (error) {
      alert("등록에 실패하였습니다. 다시 시도해주세요");
    }
  }

  if (redirect === "/") {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">사용자 등록</h1>
        <form className="max-w-md mx-auto" onSubmit={registerHandler}>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="휴대폰"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="패스워드"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primay">등록</button>
          <div className="text-center py-2 text-gray-500">
            계정을 가지고 있습니까?
            <Link className="underline text-bn px-2" to={"/login"}>
              로그인
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
