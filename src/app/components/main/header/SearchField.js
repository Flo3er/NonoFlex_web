import { useEffect, useState } from "react";
import "./SearchField.css"
import Close from "../../../../assets/images/close.png"
import Search from "../../../../assets/images/search.png"
import { useDispatch, useSelector } from "react-redux";
import { remove, search } from "../../../../features/main/SearchSlice";

const SearchField = (props) => {
    const dispatch = useDispatch();
    const [inputText, setInputText] = useState("");

    const onChangeTextField = (value) => {
        setInputText(value);
    }

    const onClickRemoveButton = () => {
        setInputText("");
        dispatch(remove());
    }

    const onClickSearchButton = () => {
        console.log(inputText);
        dispatch(search(inputText));
    }

    const pressKey = () => {
        if(window.event.keyCode == 13) {
            console.log(inputText);
            dispatch(search(inputText));
        }
    }

    return (
        <div className="normalInputBox">
            <input type="text"
                value={inputText}
                className='searchInputBox'
                onChange={({ target: { value } }) => onChangeTextField(value)}
                placeholder="검색어를 입력하세요."
                onKeyUp={pressKey}
            />

            {
                inputText === "" ? null :
                    <img src={Close}
                        alt='remove'
                        className='removeButton'
                        onClick={onClickRemoveButton} />
            }

            <img src={Search}
                alt='search'
                className='searchButton'
                onClick={onClickSearchButton} />
        </div>
    );
}

export default SearchField;