//引入菜单项需要的图标
import {
    AndroidOutlined,
    AppleOutlined,
    GithubOutlined,
    WechatOutlined,
    AlipayOutlined,
    TaobaoOutlined,
    HomeOutlined,
    MailOutlined
} from '@ant-design/icons';

const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: HomeOutlined
    }, 
    {
        title: '通用',
        key: '/commons',
        icon: AndroidOutlined,
        children: [
            {
                title: 'Button按钮',
                key: '/commons/button'
            },
            {
                title: 'Icon图标',
                key: '/commons/icon'
            },
            {
                title: 'Typography排版',
                key: '/commons/typography'
            }
        ]
    },
    {
        title: '布局',
        key: '/layouts',
        icon: MailOutlined,
        children: [
            {
                title: 'Divider分割线',
                key: '/layouts/divider'
            },
            {
                title: 'Grid栅格',
                key: '/layouts/grid'
            },
            {
                title: 'Layout布局',
                key: '/layouts/layout'
            },
            {
                title: 'Space间距',
                key: '/layouts/space'
            }
        ]
    },
    {
        title: '导航',
        key: '/link',
        icon: AppleOutlined,
        children: [
            {
                title: 'Affix固钉',
                key: '/link/affix'
            },
            {
                title: 'Breadcrumb面包屑',
                key: '/link/breadcrumb'
            },
            {
                title: 'Dropdown下拉菜单',
                key: '/link/dropdown'
            },
            {
                title: 'Menu导航菜单',
                key: '/link/menu'
            },
            {
                title: 'PageHeader页头',
                key: '/link/pageHeader'
            },
            {
                title: 'Pagination分页',
                key: '/link/pagination'
            },
            {
                title: 'Steps步骤条',
                key: '/link/steps'
            }]
    },
  
]

export default menuList