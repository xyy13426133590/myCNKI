import React from "react";
import { withRouter, Link } from 'react-router-dom'
import { Menu } from "antd";
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;

/*
* 左侧导航组件
* */
class LeftNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openKey: [],
            selectedKeys: []
        }
    }

    //组件挂载之后设置默认展开项
    componentDidMount() {
        //防止页面刷新侧边栏又初始化了
        const pathname = this.props.location.pathname
        console.log(pathname)  //  /home
        //获取当前所在的目录层级
        const rank = pathname.split('/');//['', 'home']
        console.log(rank, rank.length)
        switch (rank.length) {
            case 2:    //一级目录
                this.setState({
                    selectedKeys: [pathname]
                })
                break;
            // case 5: //三级目录，要展开两个subMenu
            //     this.setState({
            //         selectedKeys: [pathname],
            //         openKey: [rank.slice(0, 3).join('/'), rank.slice(0, 4).join('/')]
            //     })
            //     break;
            default:
                this.setState({
                    selectedKeys: [pathname],
                                                                    //  /commons/button  从开始截取，从末尾开始查找到头 /结束
                    openKey: [pathname.substr(0, pathname.lastIndexOf('/'))]  //默认展开子菜单的openKey
                })
        }
    }

    // componentDidUpdate(nextProps) {
    //     //当点击面包屑导航时，侧边栏要同步响应
    //     const pathname = nextProps.location.pathname
    //     if (this.props.location.pathname !== pathname) {
    //         this.setState({
    //             selectedKeys: [pathname]
    //         })
    //     }
    // }

    //当点击菜单时切换路由
    handleChangeMenu = ({ key }) => {
        console.log(key)
        //this.props.history.push(key)
        this.setState({ selectedKeys: [key] })
    }

    //只展示当前父级菜单(父级菜单下可能还有子菜单)
    handleOpenChange = (openKey) => {
        console.log(openKey)
        if (openKey.length === 0 || openKey.length === 1) {
            this.setState({
                openKey
            })
            return
        }

        //最新展开的菜单
        const latestOpenKey = openKey[openKey.length - 1]
        //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个
        //只适用于三级菜单
        if (latestOpenKey.includes(openKey[0])) {
            this.setState({
                openKey
            })
        } else {
            this.setState({
                openKey: [latestOpenKey]
            })
        }
    }

    /*
    * 根据menu的数据数组生成对于标签数组
    * 使用map() + 递归调用
    * */
       getMenuNodes = (menuList) => {
            return menuList.map(item => {
                if (!item.children) {
                    return (
                        <Menu.Item key={item.key} >
                            <Link to={item.key}>
                                {/* <item.icon /> */}
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                } else {
                    return (
                        <SubMenu key={item.key} title={
                            <span>
                                <item.icon />
                                <span>{item.title}</span>
                            </span>
                        }>
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    )
                }

            })
        }

    render() {
        const { openKey, selectedKeys } = this.state;
        return (
            <div style={{ overflowY: 'srcoll', height: '100vh' }}>
                <div style={styles.logo}></div>
                {/* <div className="logo" /> */}
                <Menu theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    onClick={this.handleChangeMenu}
                    selectedKeys={selectedKeys}
                    onOpenChange={this.handleOpenChange}
                    openKeys={openKey}>
                    {
                        this.getMenuNodes(menuList)  //获取menu的所有子节点
                    }
                </Menu>
            </div>
        )
    }
}

const styles = {
    logo: {
        height: '32px',
        background: 'rgba(255, 255, 255, .2)',
        margin: '16px'
    }
}

export default withRouter(LeftNav)