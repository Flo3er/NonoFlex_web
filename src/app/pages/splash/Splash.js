import logo from '../../../assets/images/logo.png';
import './Splash.css'

const Splash = () => {
    return (
      <div className="splash">
        <img src={logo} className="splashLogo"/>
      </div>  
    );
}

export default Splash;