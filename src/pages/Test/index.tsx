import { Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const Test = () => {
    const menu = (
        <Menu>
            <Menu.Item key="1">
                Lựa chọn 1
            </Menu.Item>
            <Menu.Item key="2">
                Lựa chọn 2
            </Menu.Item>
            <Menu.Item key="3">
                Lựa chọn 3
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            {/* <Button> */}
            <EllipsisOutlined />
            {/* </Button> */}
        </Dropdown>
    );
};

export default Test;
