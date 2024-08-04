import { useRoutes } from 'react-router-dom';
import { routes } from '../../routes';

function AllRoutes() {
    const routesConfig = routes(); // Gọi hàm routes để lấy cấu trúc routes
    const elements = useRoutes(routesConfig); // Sử dụng cấu trúc routes với useRoutes
    return elements;
}

export default AllRoutes;
