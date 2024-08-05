import { Outlet } from "react-router-dom";
import NotificationContainer from "../../components/common/NotificationContainer";
import Header from "../../components/partials/header";

function LayoutDefault() {
    return (
        <>
            <NotificationContainer />
            <Header />
            <Outlet />
        </>
    );
}

export default LayoutDefault;