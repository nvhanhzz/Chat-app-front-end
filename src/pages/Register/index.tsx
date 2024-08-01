import React from 'react';
import type { FormProps } from 'antd';
import { Button, Col, Form, Input, Row } from 'antd';
import "./register.scss";

type FieldType = {
    email?: string;
    password?: string;
    confirmPassword?: string;
    fullName?: string;
    phone?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Register: React.FC = () => (
    <Row>
        <Col xs={2} sm={4} md={7} lg={7} xl={7}>
        </Col>
        <Col xs={20} sm={16} md={10} lg={10} xl={10}>
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className='register-form'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <p className='register-form__title'>Đăng ký</p>
                <Form.Item<FieldType>
                    label="Họ và tên"
                    name="fullName"
                    rules={[{ required: true, message: 'Họ và tên không được để trống!' }]}
                >
                    <Input placeholder="Nhập họ tên" />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                >
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>

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

                <Form.Item<FieldType>
                    label="Nhập lại mật khẩu"
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Nhập lại mật khẩu không được để trống!' }]}
                >
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                    <Button type="primary" htmlType="submit" block>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>
);

export default Register;