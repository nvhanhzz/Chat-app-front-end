import { Outlet } from "react-router-dom";
import NotificationContainer from "../../components/common/NotificationContainer";

function LayoutDefault() {
    return (
        <>
            <NotificationContainer />
            <h1>Layout default</h1>
            <Outlet />
        </>
    );
}

export default LayoutDefault;