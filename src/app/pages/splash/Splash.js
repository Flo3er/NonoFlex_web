import { useEffect } from 'react';
import logo from '../../../assets/images/logo.png';
import Utils from '../../../features/utils/Utils';
import './Splash.css'

const Splash = () => {

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
    <div className="splash">
      <img src={logo} className="splashLogo" />
    </div>
  );
}

export default Splash;