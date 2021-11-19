import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './style.css'
// import history from '../../utils/History'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
}

class RegisterForm extends React.Component {
    state = {
        focusItem: -1, //保存当前聚焦的input
        code: ''   //验证码
    }

    onFinish = values => {
        console.log('Success', values)
    }

    onFinishFailed = errorInfo => {
        console.log('Failed', errorInfo)
    }

    componentDidMount() {
        //this.createCode();
    }

    loginSubmit = (e) => {
        //登录跳转
        e.preventDefault()
        //history.push({ pathname: '/home', state: {} })
    }

    gobackLogin = () => {
        this.props.switchShowBox('login')
    }
    render() {

        return (
            <div>
                <h3 className="title">管理员注册</h3>
                <Form
                    {...layout}
                    name='basic'
                    initialValues={{ username: '', password: '' }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        name='username'
                        rules={[{ required: true, message: '用户名不能为空' }]}>
                        <Input style={styles.input} prefix={<UserOutlined className='site-form-item-icon' style={{ color: '#fff' }} />} placeholder='用户名' />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[{ required: true, message: '密码不能为空' }]}>
                        <Input style={styles.input} prefix={<LockOutlined className='site-form-item-icon' style={{ color: '#fff' }} />} type='password' placeholder="密码" />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[{ required: true, message: '密码不能为空' }]}>
                        <Input style={styles.input} prefix={<LockOutlined className='site-form-item-icon' style={{ color: '#fff' }} />} type='password' placeholder="确认密码" />
                    </Form.Item>
                    <div className='bottom'>
                        <input className='loginBtn' type="submit" value='注册' />
                        <span className='registerBtn' onClick={this.gobackLogin}>返回登录</span>
                    </div>
                </Form>
                <div className="footer">
                    <div>欢迎登录后台管理系统</div>
                </div>
            </div >
        )

    }

}

const styles = {
    input: {
        borderRadius: '30px',
        // color: '#61bfff',
        maxWidth: '240px',
        width: '240px',
        backgroundColor: 'transparent',
        color: '#fff'
    }
}

export default RegisterForm;