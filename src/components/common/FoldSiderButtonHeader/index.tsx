import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Button } from 'antd';
import { fold, unfold } from '../../../redux/actions/foldSider';

const FoldSiderButton: React.FC = () => {
    const dispatch = useDispatch();
    const isFolded = useSelector((state: RootState) => state.fold.isFolded);

    const foldClicked = () => {
        if (isFolded) {
            dispatch(unfold());
        } else {
            dispatch(fold());
        }
    }

    return (
        <div className="fold-sider-button">
            <Button
                type="text"
                icon={isFolded ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={foldClicked}
            />
        </div>
    );
}

export default FoldSiderButton;
