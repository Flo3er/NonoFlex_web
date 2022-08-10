import Instance from "./NoticeInstance";

// Notice 생성(post)
const NoticePost = async () => {
  try {
    const response = await Instance.post("/api/v1/notice", {
      title: "sampleNoice",
      content: "샘플용",
      onFocused: false,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// Notice 조회(get)
const NoticeGet = async () => {
  try {
    const response = await Instance.get("/api/v1/notice");
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// Notice 수정(put)
const NoticePut = async () => {
  try {
    const response = await Instance.put("/api/v1/notice/20", {
      title: "sampleNoice",
      content: "이건 샘플입니다",
      onFocused: false,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// Notice 삭제(delete)
const NoticeDelete = async () => {
  try {
    const response = await Instance.delete("/api/v1/notice/16", {});
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// 여러 함수를 하나의 변수로 통합 후 export
const NoticeMethod = {
  NoticePost,
  NoticeGet,
  NoticePut,
  NoticeDelete,
};

export default NoticeMethod;
