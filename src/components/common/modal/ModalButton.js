import { useState } from 'react';

// import styled from 'styled-components';
import './Modal.css';
import FirstModal from './FirstModal';
import SecondModal from './SecondModal';

const ModalButton = () => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const onClickButton1 = () => {
        setIsOpen1(true);
    };

    const onClickButton2 = () => {
        setIsOpen2(true);
    };

    return (
        <div className='buttonWrap'>
            <button className='firstClick' onClick={onClickButton1}>Click</button>
            <button className='secondClick' onClick={onClickButton2}>Click</button>
            {isOpen1 && ( 
                <FirstModal
                    onClose={() => {
                        setIsOpen1(false);
                }}
            />)}

            {isOpen2 && ( 
                <SecondModal
                    onClose={() => {
                        setIsOpen2(false);
                }}
            />)}
        </div>
    );
}

// const Button = styled.button`
//     font-size: 14px;
//     padding: 10px 20px;
//     border: none;
//     background-color: #fa9f98;
//     border-radius: 10px;
//     color: white;
//     font-style: italic;
//     font-weight: 200;
//     cursor: pointer;
//     &.blue {
//         background-color: #6699FF;
//         font-size: 14px;
//         margin-left: 30px;
//       }
//     &:hover {
//         background-color: #fac2be;
//     }
// `;

// const ButtonWrap = styled.button`
//     border: none;
//     background-color: white;
//     text-align: center;
//     margin: 50px auto;
// `;

export default ModalButton;