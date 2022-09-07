import { useEffect } from 'react';

import NoticeMethod from '../../../apis/NoitceMethod';

const NoticeApiMain = () => {
    useEffect(() => {
        // Notice 생성 실행
        // NoticeMethod.NoticePost();

        // Notice 조회 실행
        NoticeMethod.NoticeGet();

        // Notice 수정 실행
        // NoticeMethod.NoticePut();
        
        // Notice 삭제 실행
        // NoticeMethod.NoticeDelete();
    }, []);

};
export default NoticeApiMain;