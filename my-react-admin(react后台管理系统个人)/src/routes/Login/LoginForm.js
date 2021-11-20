import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './style.css'
import { Redirect, withRouter } from 'react-router-dom'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            focusItem: -1, //保存当前聚焦的input
            code: '',   //验证码
            username: '',
            password: ''
        }
    }

    onFinish = (values) => {
        let user = values.username;
        let pwd = values.password;
        if (user === 'xyy' && pwd === '123456') {
            console.log("用户名:" + user, "密码:" + pwd)

        }
        console.log('Success', values)
        // let history = this.props.history 

    }

    onFinishFailed = errorInfo => {
        console.log('Failed', errorInfo)
    }

    onValuesChange = valueChange => {
        //console.log("改变值", valueChange)
        
    }

    componentDidMount() {
        //this.createCode();
    }

    loginSubmit = (e) => {
        //登录跳转
        e.preventDefault()
        this.props.history.push("/home")
        console.log(e)
    }

    register = () => {
        this.props.switchShowBox('register');
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <h3 className="title">管理员登录</h3>
                <Form
                    {...layout}
                    name='basic'
                    initialValues={{ username: '', password: '' }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    onValuesChange={this.onValuesChange}
                >
                    <Form.Item
                        name='username'
                        rules={[{ required: true, message: '请输入用户名' }]}>
                        <Input style={styles.input} prefix={<UserOutlined className='site-form-item-icon' style={{ color: '#fff' }} />} placeholder='用户名' />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[{ required: true, message: '请输入密码' }]}>
                        <Input style={styles.input} prefix={<LockOutlined className='site-form-item-icon' style={{ color: '#fff' }} />} type='password' placeholder="密码" />
                    </Form.Item>
                    <div className='bottom'>
                        {/* <Form.Item>
                            <Button className='loginBtn' htmlType="button">登录</Button> */}
                        <input className='loginBtn' type="submit" value='登录' onClick={this.loginSubmit} />
                        <span className='registerBtn' onClick={this.register}>注册</span>
                        {/* </Form.Item> */}
                    </div>
                </Form >
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
        maxWidth: '240px',
        width: '240px',
        color: '#fff',
        backgroundColor: 'transparent',

    }
}

export default withRouter(LoginForm);