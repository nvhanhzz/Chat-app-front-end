import React from 'react';
import type { FormProps } from 'antd';
import { Button, Col, Form, Input, Row } from 'antd';
import "./login.scss";
import { Link, useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/AuthService';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../redux/actions/notificationAction';
import { login } from '../../redux/actions/auth';
import { setCurrentUser } from '../../redux/actions/currentUser';

type FieldType = {
    email?: string;
    password?: string;
};

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const response = await postLogin(values);
            const result = await response.json();

            if (response.status === 200) {
                dispatch(addNotification('Thông báo', result.message, 5));
                dispatch(login());
                dispatch(setCurrentUser(result.user));
                navigate("/");
            } else {
                dispatch(addNotification('Thông báo', result.message, 5));
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row>
            <Col xs={2} sm={4} md={7} lg={7} xl={7}>
            </Col>
            <Col xs={20} sm={16} md={10} lg={10} xl={10}>
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    className='login-form'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <p className='login-form__title'>Đăng nhập</p>
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Email không được để trống!' }]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <div className='login-form__other-featured'>
                        <Link to='/forgot-password'>Quên mật khẩu?</Link>
                        <Link to='/register'>Đăng ký</Link>
                    </div>

                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                        <Button type="primary" htmlType="submit" block>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Login;