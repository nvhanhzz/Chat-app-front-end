import { useRoutes } from "react-router";
import { routes } from "../../routes";

function AllRoutes() {
    const elements = useRoutes(routes);
    return elements;
}

export default AllRoutes;