import { useEffect } from "react";
// import toast from "../components/common/modal/NoticeModal";

const useOutSideClick = (ref, callback) => {
  useEffect(() => {
    const handleClick = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        // ?. = 참조가 null 또는 undefined라면 에러가 발생하지 않는 것
        // [Optional chaining]
        callback?.();
        return;
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => window.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
};

export default useOutSideClick;
