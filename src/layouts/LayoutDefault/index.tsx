import { Outlet } from "react-router-dom";
import NotificationContainer from "../../components/common/NotificationContainer";
import Header from "../../components/partials/Header";
import SiderComponent from "../../components/partials/Sider";
import "./layout-default.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function LayoutDefault() {
    const isFolded = useSelector((state: RootState) => state.fold.isFolded);

    return (
        <>
            <NotificationContainer />
            <Header />
            <main className="main">
                <SiderComponent />
                <div className={`main__outlet ${isFolded ? 'main__outlet-folded' : ''}`}>
                    <Outlet />
                </div>
            </main>
        </>
    );
}

export default LayoutDefault;