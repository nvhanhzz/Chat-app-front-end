import { useRoutes } from 'react-router-dom';
import { routes } from '../../routes';

function AllRoutes() {
    const routesConfig = routes();
    const elements = useRoutes(routesConfig);
    return elements;
}

export default AllRoutes;
