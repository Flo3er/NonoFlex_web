import Header from "../../components/common/header/Header.js"
import Sidebar from "../../components/common/sidebar/Sidebar.js"

const Main = () => {
    return (
        <div>
            <Header />
            <div>
                <Sidebar value="/main"/>
            </div>
        </div>
    );
}

export default Main;