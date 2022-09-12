import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RegisterForm.css';
import LoginMethod from '../../../apis/LoginMethod';
import Visibility  from '../../../assets/image/visibility.png';
import { Button } from '@mui/material';
// import Instance from '../../apis/LoginInstance';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [passwordch, setPasswordch] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [emailcertificationNum, setEmailCertificationNum] = useState('');
  const [emailcheck, setEmailCheck] = useState(true);
  const [passwordcheck, setPasswordCheck] = useState(true);
  const [idcheck, setIdCheck] = useState(true);
  const [min, setMin] = useState(5);
  const [sec, setSec] = useState(0);
  const [timeraction, setTimerAction] = useState(false);
  var regExpname = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,20}$/
  var regExpid = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{6,20}$/
  var regExpemail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  var regExppw = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/

  useEffect(() => {
    if (timeraction) {
      const countdown = setInterval(() => {
        if (sec > 0) {
          setSec(sec - 1);
        }
        if (sec === 0) {
          if (min === 0) {
            alert('인증시간 초과')
          } else {
            setMin(min - 1);
            setSec(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [min, sec, timeraction]);

 const test = () => {
  console.log('다른 함수'+emailcheck)
 }

 const EmailChecktest = () => {
  if(regExpemail.test(email)){
    setEmailCheck(true);
    console.log('out :'+emailcheck)
  }else{
    setEmailCheck(false);
    console.log(emailcheck)
  }
 }
 const EmailCertification = () => {
  alert('인증요청을 보냈습니다')
  setTimerAction(true)
 }

 const idchecked = () => {
  if(regExpid.test(id)){
    setIdCheck(true);
    alert('아이디 중복체크')
    console.log('out :'+emailcheck)
  }else{
    setIdCheck(false);
    alert('아이디 형식 오류')
    console.log(emailcheck)
  }
 }
 const PasswordChecktest = () => {
  if(regExppw.test(password)){
    setPasswordCheck(true);
    if(password !== passwordch){
      setPasswordCheck(false);
    }
  }else{
    setPasswordCheck(false);
  }
 }
  return (
    <div>
      {/* <h2>시작 페이지</h2>  */}
      <div className='registerform'>
        <h2>회원가입</h2>
        <ul className='registerinfo'>
          <li >
            <p className='shorttext'>이름</p>
            <input type='text' value={name} className='infoinputbox' onChange={({target: {value}}) => setName(value)}/>
          </li>
          <li >
            <p className='shorttext'>아이디</p>
            <input type='text' value={id} className={idcheck ? 'idcheck' : 'unidcheck'}onChange={({target: {value}}) => setId(value)}/>
            <button className='emailcheckbtn' onClick={(e) => idchecked()}>중복체크</button>
          </li>
          <li >
            <p className='shorttext'>이메일</p>
            <input type='text' value={email} className={emailcheck ? 'infoinputbox' : 'uninfoinputbox'}  onChange={({target: {value}}) => setEmail(value)} onBlur={() => EmailChecktest()}/>
            {
            emailcheck ? <p className='emailChecktext'></p> :
            ( regExpemail.test(email)
            ? <p className='emailChecktext'></p>
            : <p className='emailChecktext'>이메일 형식이 아닙니다</p>)
          }
          </li>     
          <li >
            <p className='longtext'>이메일 인증</p>
            <label className='certificationtimer' for='inputnum'>
              <input type='text' value={emailcertificationNum} onChange={({target: {value}}) => setEmailCertificationNum(value)} className='emailcheck' id='inputnum' maxlength='6'/>
              {min} : {sec < 10 ?  '0'+sec : sec}</label>
            <button className={regExpemail.test(email) ? 'emailcheckbtn' : 'unemailcheckbtn'} disabled={!regExpemail.test(email)} onClick={(e) => {EmailCertification()}}>인증요청</button>
          </li>
          <li >
            <p className='shorttext'>비밀번호</p>
            <input type='password' value={password} className='infoinputbox' onChange={({target: {value}}) => setPassword(value)}/>
            {
            passwordcheck ? <p className='passwordChecktext'></p> :
            ( regExpemail.test(password)
            ? <p className='passwordChecktext'></p>
            : <p className='passwordChecktext'>비밀번호 형식이 아닙니다</p> )
          }
          </li>
          <li >
            <p className='longtext'>비밀번호 확인</p>
            <input type='password' value={passwordch} className='infoinputbox' onChange={({target: {value}}) => setPasswordch(value)} onBlur={()=>PasswordChecktest()}/>
            {
            passwordcheck ? <p className='passwordarticleChecktext'></p> :
            ( password === passwordch
            ? <p className='passwordarticleChecktext'></p>
            : <p className='passwordarticleChecktext'>비밀번호가 다릅니다</p> )
          }
          </li>
          <li >
            <button className='registersubmit' onClick={(e) => {test()}}>회원가입</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RegisterForm;
