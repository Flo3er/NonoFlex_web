import SearchField from "../../main/header/SearchField";
import "./Header.css"

const Header = props => {

  return (
    <div className="mainHeader">
      <div className="headerLeftEmptySpace" />
      <div>
        <p className="headerTitle">{props.title}</p>
        <pre className="headerDesc">{props.desc}</pre>
      </div>
      <div className="emptySpace">

      </div>
      {
        props.isSearch ?
          <div className="searchFieldBox">
            <SearchField />
          </div> 
          : null
      }

    </div>
  );
}

export default Header;