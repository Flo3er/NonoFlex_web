import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import LoginMethod from '../../apis/LoginMethod';
// import Instance from '../../apis/LoginInstance';
function Login () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("")
  const Onlogin = async() =>{
    Logininfosand();
  }
  function Logininfosand () {
    const post = LoginMethod.LoginPost();
    setToken(post);
    console.log(post);
  }
  return (
    <div>
      {/* <h2>시작 페이지</h2>  */}
      <div className='loginbody'>
      <div className='loginform'>
        <h2>환영합니다</h2>
        <input type="text" 
               value = {email}
               className='loginEmail'
               onChange={({target: {value}}) => setEmail(value)}
               placeholder="email"
        />
        <input type="password" 
               value = {password}
               className='loginPassword'
               onChange={({target: {value}}) => setPassword(value)}
               placeholder="pw"
        />
        <div className='sign'>
        <Link to="" className='liA'><p>회원가입 |</p></Link>
        <Link to="" className='liA'><p>비밀번호 찾기</p></Link>
        </div>
        <button onClick={(e) => {Onlogin(email, password)}} className='submit'>로그인</button>
      </div>
      </div>
    </div>
  )
}

export default Login;
