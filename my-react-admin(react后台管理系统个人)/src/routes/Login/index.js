import React from 'react';
import BGParticle from '../../utils/BGParticle'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import './style.css'
const url = 'http://47.99.130.140/imgs/wallhaven-g83v2e.jpg';

class Login extends React.Component {
    state = {
        showBox: 'login', //默认显示当前登录表单
        url: '',
        loading: false
    }

    componentDidMount() {
        this.initPage()   //初始化页面
    }

    componentWillUnmount() {
        this.particle && this.particle.destory()
    }

    //载入页面时的处理
    initPage = () => {
        this.setState({
            loading: true
        })
        this.loadImageAsync(url).then(url => {
            this.setState({
                loading: false,
                url
            })
        }).then(() => {
            //为什么写在then里？id为backgroundBox的DOM元素是在loading为false时才有，而上面的setState可能是异步的，必须等到setState执行完成后才去获取dom
            this.particle = new BGParticle('backgroundBox')
            this.particle.init()
        })
    }

    //背景图预加载
    loadImageAsync(url) {
        return new Promise(function (resolve, reject) {
            const image = new Image();
            image.onload = function () {
                resolve(url)
            };
            image.onerror = function () {
                console.log('图片载入错误')
            };
            image.src = url;
        });
    }

    //切换界面
    switchShowBox = (box) => {
        this.setState({
            showBox: box
        })
    }

    render() {
        const { showBox } = this.state
        return (
            <div id="login-page">
                <div id='backgroundBox' style={styles.backgroundBox} />
                <div className='formBox'>
                    <div className='container'>
                        <LoginForm
                            className={showBox === 'login' ? 'box showBox' : 'box hiddenBox'}
                            switchShowBox={this.switchShowBox}
                        />
                        {/* <RegisterForm
                            className={showBox === 'register' ? 'box showBox' : 'box hiddenBox'}
                            switchShowBox={this.switchShowBox}
                        /> */}
                    </div>
                </div>
            </div>
        )

    }
}

const styles = {
    backgroundBox: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        transition: 'all .5s'
    },
}


export default Login;