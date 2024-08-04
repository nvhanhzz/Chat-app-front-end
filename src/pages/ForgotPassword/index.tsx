import React from 'react';
import type { FormProps } from 'antd';
import { Button, Col, Form, Input, Row } from 'antd';
import "./forgotPassword.scss";

type FieldType = {
    email?: string;
};

const ForgotPassword: React.FC = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
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
                    className='forgot-password-form'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <p className='forgot-password-form__title'>Quên mật khẩu</p>
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Email không được để trống!' }]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                        <Button type="primary" htmlType="submit" block>
                            Nhận mã OTP
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default ForgotPassword;