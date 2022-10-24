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

  const [emailcode, setEmailCode] = useState('');


  const [emailduplicatecheck, setEmailDuplicateCheck] = useState(false); // 이메일 중복 체크 판단
  const [emailcheck, setEmailCheck] = useState(true); // 이메일 형식 체크 판단 => 포커스 아웃이후에 형식 판단을 위해 초기값 트루
 
  const [codesendcheck, setCodeSendCheck] = useState(false); // 코드 요청 보냈는지 판단 => 인증요청, 인증확인이 같은 자리의 버튼에서 일어나기에 변수로 판단
  const [codecheck, setCodeCheck] = useState(true); // 이메일 코드 형식 체크 판단 => 포커스 아웃이후에 형식 판단을 위해 초기값 트루
  const [coderusultcheck, setCodeResultCheck] = useState(false);

  const [passwordcheck, setPasswordCheck] = useState(true); // 패스워드 형식 체크 판단
  const [passwordsameck, setPasswordSameck] = useState(true); // 패스워드 중복 판단

  const [idcheck, setIdCheck] = useState(false);
  const [min, setMin] = useState(5);
  const [sec, setSec] = useState(0);
  const [timeraction, setTimerAction] = useState(false);
  var regExpname = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,20}$/
  var regExpid = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{6,20}$/
  var regExpemail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  var regExppw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
  var regExpcode = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8}$/

  useEffect(() => {
    if (timeraction) {
      const countdown = setInterval(() => {
        if (sec > 0) {
          setSec(sec - 1);
        }
        if (sec === 0) {
          if (min === 0) {
            alert('인증시간 초과');
            setTimerAction(false);
            setMin(5);
            setSec(0);
          } else {
            setMin(min - 1);
            setSec(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [min, sec, timeraction]);


// 회원가입 인증
 const test = (name, email, emailcode, passwordch) => {
  if(name == null){
    alert('이름을 입력해 주세요')
  }else if(email == null){
    alert('이메일을 입력해 주세요')
  }else if(regExpemail.test(email)){
    alert('이메일 형식을 체크해 주세요')
  }else if(emailcode == null){
    alert('인증 코드를 입력해 주세요')
  }else if(regExpcode.test(emailcode)){
    alert('인증코드 형식을 체크해 주세요')
  }else if(passwordch == null){
    alert('비밀 번호와 비밀 번호 확인을 입력해 주세요')
  }else if(password !== passwordch){
    alert('비밀 번호가 일치하지 않습니다. 확인해 주세요')
  }else{
    const respone = LoginMethod.Join(name, email, passwordch, emailcode);
    if(respone.data.userCode !== null){
      alert('회원가입 되었습니다.');
    }else{
      alert('알 수 없는 오류');
    }
    console.log(respone);
  }
  
 }


//이메일 형식 체크 판단
 const EmailChecktest = () => {
  if(regExpemail.test(email)){
    setEmailCheck(true);
    console.log('out :'+emailcheck)
  }else{
    setEmailCheck(false);
    console.log(emailcheck)
  }
 }
 //이메일 코드 형식 체크 판단
 const CodeChecktest = () => {
  if(regExpcode.test(emailcode)){
    setCodeCheck(true);
  }else{
    setEmailCheck(false);
  }
 }

 //이메일 인증 코드를 보내는 동작 
 const EmailCodeSend = async(email) => {
  const respone = await LoginMethod.EmailCheck(email);
  if(respone.data.result){
    alert('인증요청을 보냈습니다')
    setCodeSendCheck(true);
    setTimerAction(true);
  }else{
    alert('오류 : '+respone)
  }
 }
  //코그 인증 확인 동작
  const EmailCodeCheck = async(email, emailcode) => {
    const respone = await LoginMethod.EmailVerify(email, emailcode);
    if(respone.data.result){
      alert('코드가 일치 합니다')
      setCodeResultCheck(true);
      setTimerAction(false);
    }else if(!respone.data.result){
      alert('코드가 다릅니다')
    }
    else{
      alert('오류 : '+respone)
    }
   }


 //이메일 중복 체크 동작
 const emailduplicate = async(email) => {
  if(regExpemail.test(email)){
    const respone = await LoginMethod.EmailDuplicate(email);
    if(respone.data.result){
      alert('사용가능한 이메일 입니다')
      setEmailDuplicateCheck(true);
      setIdCheck(true);
    }else if( !respone.data.result ){
      alert('중복 이메일입니다')
    }else {
      alert('알 수 없은 오류')
    }
  }else{
    setIdCheck(false);
    alert('아이디 형식 오류')
    console.log(regExpemail.test(email))
  }
 }

//비밀번호 형식 체크
 const PasswordChecktest = () => {
  if(regExppw.test(password)){
    setPasswordCheck(true);
  }else{
    setPasswordCheck(false);
  }
 }
//비밀번호 확인 체크
const PasswordSamecheck = () => {
  if(password === passwordch){
    if(passwordcheck){
      setPasswordSameck(true);
    }
  }else{
    setPasswordSameck(false);
  }
 }

  return (
    <div>
      {/* <h2>시작 페이지</h2>  */}
      <div className='registerform'>
        <h2>회원가입</h2>
        <ul className='registerinfo'>
          <li>
            <p className='textbox'>이름</p>
            <input type='text' value={name} className='shortinfoinputbox' onChange={({target: {value}}) => setName(value)}/>
          </li>
          <li >
            <p className='textbox'>이메일</p>
            <input type='text' value={email} className={emailcheck ? 'longinfoinputbox' : 'unlonginfoinputbox'}  onChange={({target: {value}}) => setEmail(value)} onBlur={() => EmailChecktest()}/>
            {emailduplicatecheck ?  <button className= 'pressrdbtn'>확인 완료</button> : 
            <button className= 'defaultbtn' onClick={(e) => {emailduplicate(email)}}>중복 확인</button>}
            <br/>{
            emailcheck ? <p className='emailChecktext'></p> :
            ( regExpemail.test(email)
            ? <p className='emailChecktext'></p>
            : <p className='emailChecktext'>이메일 형식이 아닙니다</p>)
          }
          </li>
      
               
          <li >
            <p className='textbox'>이메일 인증</p>
            <input type='text' value={emailcode} onChange={({target: {value}}) => setEmailCode(value)} className={codecheck ? 'shortinfoinputbox' : 'unshortinfoinputbox'} onBlur={() => CodeChecktest()} id='inputnum' maxLength='8'/>
            <label className='certificationtimer' > {min} : {sec < 10 ?  '0'+sec : sec}</label>
            {codesendcheck ? <button className={regExpcode.test(emailcode) ? (coderusultcheck ? 'pressrdbtn' : 'defaultbtn') : 'disabledbtn'} disabled={!regExpcode.test(emailcode)} onClick={(e) => {EmailCodeCheck(email, emailcode)}}>인증 확인</button>
            : <button className={emailduplicatecheck ? 'defaultbtn' : 'disabledbtn'} disabled={!emailduplicatecheck} onClick={(e) => {EmailCodeSend(email)}}>인증 요청</button>
            }
          </li>


          <li >
            <p className='textbox'>비밀번호</p>
            <input type='password' value={password} className='longinfoinputbox' onChange={({target: {value}}) => setPassword(value)} onBlur={()=>PasswordChecktest()}/>
            {
            passwordcheck ? <p className='passwordChecktext'></p> :
            ( regExpemail.test(password)
            ? <p className='passwordChecktext'></p>
            : <p className='passwordChecktext'>비밀번호 형식이 아닙니다</p> )
          }
          </li>
          <li >
            <p className='textbox'>비밀번호 확인</p>
            <input type='password' value={passwordch} className='longinfoinputbox' onChange={({target: {value}}) => setPasswordch(value)} onBlur={()=>PasswordSamecheck()}/>
            {
            passwordsameck ? 
              <p className='passwordarticleChecktext'></p>
            : <p className='passwordarticleChecktext'>비밀번호가 다릅니다</p>
          }
          </li>
          <li >
            <button className='registersubmit' onClick={(e) => {test(name, email, emailcode, passwordch)}}>회원가입</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RegisterForm;
