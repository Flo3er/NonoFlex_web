import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { select } from '../modules/boardSlice';
 
function BoardList() {
    // inputData에는 useSelector를 이용해 조회한 state내에 있는 inputData를 저장한다.
    const inputData = useSelector(state => state.board.inputData);
    // lastId useSelector를 이용해 조회한 state내에 있는 lastId 저장한다.
    const lastId = useSelector(state => state.board.lastId);
    const dispatch = useDispatch();
 
    // selectContent는 id를 파라미터로 받으며 그 값을 select action에 dispatch한다.
    const selectContent = (id) => {
        console.log(id);
        dispatch(select(id));
    };
    
    return(
        <div>
            <h2>게시판</h2>
            <div>
                <table className='listTable'>
                    <tbody>
                        <tr>
                            <td className='listTableIndex th'>index</td>
                            <td className='listTableTitle th'>title</td>
                        </tr>
                        {lastId !== 0 ?
                            inputData.map(rowData => (
                                rowData.id !== '' &&
                                <tr>
                                    <td className='listTableIndex' onClick={() => selectContent(rowData.id)}>
                                        <Link to='/BoardContent'>{rowData.id}</Link>
                                    </td>
                                    <td className='listTableTitle' onClick={() => selectContent(rowData.id)}>
                                        <Link to='/BoardContent'>{rowData.title}</Link>
                                    </td>
                                </tr>
                            )) : 
                            <tr>
                            <td className='listTableIndex'></td>
                            <td className='listTableTitle noData'>작성된 글이 없습니다.</td>
                        </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
 
export default BoardList;

