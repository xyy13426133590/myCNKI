import React from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Dropdown, Avatar, Popconfirm ,Tooltip} from 'antd'
import { FullscreenOutlined } from '@ant-design/icons'
import screenfull from 'screenfull'
import './index.css'
import { screen } from '@testing-library/react'
class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false
        }
    }

    screenfullToggle = () => {
        screenfull.toggle();

    }

    handleMenuClick = e => {
        if (e.key === '2') {
            this.setState({ visible: false, confirmLoading: true });
            setTimeout(() => {
                this.setState({
                    confirmLoading: false
                })
            }, 2000);
            this.props.history.push('/login') //跳转到登录页
        }
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false
        })
    };

    handleVisibleChange = flag => {
        this.setState({ visible: flag });
    };

    render() {
        console.log(this.props)
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">个人中心</Menu.Item>
                <Menu.Item key="2">
                    <Popconfirm
                        title="确认框"
                        visible={this.state.visible}
                        onConfirm={this.handleOk}
                        okButtonProps={{ loading: this.state.confirmLoading }}
                        onCancel={this.handleCancel}
                    >
                        退出登录 </Popconfirm>
                </Menu.Item>
            </Menu >

        );
        return (
            <div style={{ lineHeight: '64px', float: 'right' }}>
                <ul className='hader-ul'>
                <Tooltip  title="缩放" placement="top">
                <li onClick={this.screenfullToggle}><FullscreenOutlined  style={styles.bg}/></li>
                </Tooltip>
                  
                </ul>
                <div style={{ float: 'right', margin: '-80px 20px' }}>
                    <Dropdown
                        overlay={menu}
                        onVisibleChange={this.handleVisibleChange}
                        visible={this.state.visible}
                    >
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" onClick={(e) => e.preventDefault()} />
                    </Dropdown>
                </div>
            </div>
        )
    }

}

const styles = {
    bg : {
        fontSize: '22px',
        cursor: 'pointer'
    }
}

export default withRouter(HeaderBar);



