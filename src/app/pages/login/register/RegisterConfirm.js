import "./RegisterConfirm.css"

const RegisterConfirm = (props) => {

    const onClickRegisterConfirmButton = () => {
        window.location.replace("/login");
    }

    return (
        <div className="registerConfirm">
            <span className="registerConfirmTitle">회원 가입 성공!</span>
            <span className="registerConfirmDesc">관리자 승인 후 로그인이 가능합니다. 조금만 기다려 주세요!</span>
            <div className="emptySpceData" />
            <div className="registerConfirmButton"
                onClick={onClickRegisterConfirmButton}>
                <span>확인</span>
            </div>
        </div>
    );
}

export default RegisterConfirm;