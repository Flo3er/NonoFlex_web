import Instance from "./NoticeInstance";

async function NoticeGetIndex(noticeId) {
  try {
    const response = await Instance.get(`/api/v1/notice/${noticeId}`, {});
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function NoticeGetRecent() {
  try {
    const response = await Instance.get(`/api/v1/notice/recent`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Notice 생성(post)
async function NoticePost(title, content, focus, createdAt, updatedAt, writer) {
  try {
    // await = 값을 받을때까지 대기
    const response = await Instance.post("/api/v1/notice", {
      title: title,
      content: content,
      focus: focus,
      createdAt: createdAt,
      updatedAt: updatedAt,
      writer: writer,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// try & catch
// try{} -> 중괄호 안에 있는 내용 실행 시키라는 뜻 (어떤에러든 발생할수있음)
// catch(error){} -> 에러발생 시 동작시켜달라는 뜻

// Notice 조회(get)
// export const NoticeGet = async queryParameter => {
async function NoticeGet(column, order, query, size) {
  try {
    const params = {
      content: true,
      column: column,
      order: order,
      query: query,
      size: size,
    };
    const response = await Instance.get("/api/v1/notice", {
      params,
    });
    // console.log(response.data.noticeList);
    return response.data.noticeList;
  } catch (error) {
    console.log(error);
  }
}

// Notice 수정(put)
async function NoticePut(title, content, focus, noticeId) {
  console.log(noticeId);
  try {
    const response = await Instance.put(`/api/v1/notice/${noticeId}`, {
      title: title,
      content: content,
      focus: focus,
      noticeId: noticeId,
    });
    console.log(response.data);
    return response.data.noticeList;
  } catch (error) {
    console.log(error);
  }
}

// Notice 삭제(delete)
async function NoticeDelete(noticeId) {
  try {
    const response = await Instance.delete(`/api/v1/notice/${noticeId}`);
    console.log(response.data);
    return response.data.noticeList;
  } catch (error) {
    console.log(error);
  }
}

// 여러 함수를 하나의 변수로 통합 후 export
export const NoticeMethod = {
  NoticePost,
  NoticeGet,
  NoticePut,
  NoticeDelete,
  NoticeGetIndex,
  NoticeGetRecent,
  // NoticeGetContent,
  // NoticeGetQuery,
};

export default NoticeMethod;
