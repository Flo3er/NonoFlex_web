import { useEffect } from 'react';
import Utils from '../../../features/utils/Utils';
import './NotFound.css'

const NotFound = () => {

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken")
    if (accessToken === "" || accessToken === null || accessToken === undefined) {
      const fetchData = async () => {
        await Utils.timeout(1000);
        window.location.replace("/login")
      }
      fetchData();
    } else {
      const fetchData = async () => {
        await Utils.timeout(1000);
        window.location.replace("/main")
      }
      fetchData();
    }
  });

  return (
    <div className="notFound">
    </div>
  );
}

export default NotFound;