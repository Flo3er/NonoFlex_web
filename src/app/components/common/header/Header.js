import "./Header.css"

const Header = props => {

    return (
        <div className="mainHeader">
           <p className="headerTitle">{props.title}</p>
          <pre className="headerDesc">{props.desc}</pre>
        </div>
      );
}

export default Header;