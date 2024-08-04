import { Outlet } from "react-router-dom";
import NotificationContainer from "../../components/common/NotificationContainer";

function AuthLayout() {
    return (
        <>
            <NotificationContainer />
            <Outlet />
        </>
    );
}

export default AuthLayout;