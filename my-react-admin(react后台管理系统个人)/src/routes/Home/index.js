import React from 'react'
import LeftNav from '../../components/LeftNav/index'
import ContentMain from '../../components/ContentMain/index'
import HeaderBar from '../../components/HeaderBar/index'
import 'antd/dist/antd.css';
import { Layout } from 'antd'
//import screenfull from 'screenfull'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    TwitterOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout


class Home extends React.Component {
    state = {
        collapsed: false
    }

    componentDidMount(){
        // screenfull.onchange(()=>{
        //     this.setState({
        //         icon: screenfull.isFullscreen? 'shrink': 'arrows-alt'
        //     })
        // })
    }
    componentWillUnmount(){
        //screenfull.off('change')
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    render() {
        return (
            <div id="page">
                <Layout>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed} >
                        <LeftNav />
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ width: '100%',background: '#fff', padding: '0 16px' }}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                            })}
                            <HeaderBar />
                        </Header>
                        <Content>
                            <ContentMain />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>React + Antd ©2020/12/08 Created by xuyunyun </Footer>
                    </Layout>
                </Layout>
            </div >
        )
    }
}



export default Home;