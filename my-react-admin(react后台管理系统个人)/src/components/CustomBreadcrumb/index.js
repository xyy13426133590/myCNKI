import React from 'react'
import { Breadcrumb } from 'antd'
import { Link,withRouter } from 'react-router-dom'

const breadcrumbNameMap = {//跟路由路径保持一致
    "/home": "首页",
    
    "/commons": "通用",
    "/commons/button": "Button按钮",
    "/commons/icon": "Icon图标",
    "/commons/typography": "Typography排版",

    "/layouts": "布局",
    "/layouts/divider": "Divider分割线",
    "/layouts/grid": "Grid栅格",
    "/layouts/layout": "Layout布局",
    "/layouts/space": "Space间距",

    "/link": "导航",
    "/link/affix": "Affix固钉",
    "/link/breadcrumb": "Breadcrumb面包屑",
    "/link/dropdown": "Dropdown下拉菜单",
    "/link/menu": "Menu导航菜单",
    "/link/pageHeader": "PageHeader页头",
    "/link/pagination": "Pagination分页",
    "/link/steps": "Pagination分页",
  
};

const Nav = withRouter((props) => {
    const { location } = props;
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}></Link>
                {breadcrumbNameMap[url]}
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        <Breadcrumb.Item key="/home"><Link to="/">首页</Link></Breadcrumb.Item>
    ].concat(extraBreadcrumbItems);
    return (
        <div className="demo">
            <Breadcrumb style={{ margin: "16px 0" }}>
                {breadcrumbItems}
            </Breadcrumb>
        </div>
    );
});


// const CustomBreadcrumb = (props) =>{
//     <Breadcrumb style={{marginBottom:16}}>
//         <Breadcrumb.Item><Link to='/home'>首页</Link></Breadcrumb.Item>
//         {props.arr && props.arr.map(item =>{
//             if(typeof item === 'object'){
//             return <Breadcrumb.Item key={item.title}><Link to={item.to}>{item.title}</Link></Breadcrumb.Item>
//             }else{
//             return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
//             }
//         })}
//     </Breadcrumb>

// }

export default Nav