import React from 'react'
import { withRouter, Switch, Redirect, Route } from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'

//首页
const Home = LoadableComponent(() => import('../../routes/Index/index'))

//通用组件
const ButtonDemo = LoadableComponent(() => import('../../routes/Commons/Button/index'))
const IconDemo = LoadableComponent(() => import('../../routes/Commons/Icon/index'))
const TypographyDemo = LoadableComponent(() => import('../../routes/Commons/Typography/index'))

//布局组件
const DividerDemo = LoadableComponent(() => import('../../routes/Layouts/Divider/index'))
const GridDemo = LoadableComponent(() => import('../../routes/Layouts/Grid/index'))
const LayoutDemo = LoadableComponent(() => import('../../routes/Layouts/Layout/index'))
const SpaceDemo = LoadableComponent(() => import('../../routes/Layouts/Space/index'))

//导航组件
const AffixDemo = LoadableComponent(() => import('../../routes/Link/Affix'))
const BreadcrumbDemo = LoadableComponent(() => import('../../routes/Link/Breadcrumb/index'))
const DropdownDemo = LoadableComponent(() => import('../../routes/Link/Dropdown/index'))
const MenuDemo = LoadableComponent(() => import('../../routes/Link/Menu/index'))
const PageHeaderDemo = LoadableComponent(() => import('../../routes/Link/PageHeader/index'))
const PaginationDemo = LoadableComponent(() => import('../../routes/Link/Pagination/index'))
const StepsDemo = LoadableComponent(() => import('../../routes/Link/Steps/index'))



class ContentMain extends React.Component {
    render(){
        return(
            <div style={{position: 'relative', padding: '0 16px'}}>
                <Switch>
                    <Route  path='/home'  component={Home}/>

                    <Route path='/commons/button'   component={ButtonDemo} />
                    <Route path='/commons/icon' component={IconDemo} />
                    <Route path='/commons/typography' component={TypographyDemo} />

                    <Route path='/layouts/divider' component={DividerDemo} />
                    <Route path='/layouts/grid' component={GridDemo} />
                    <Route path='/layouts/layout' component={LayoutDemo} />
                    <Route path='/layouts/space' component={SpaceDemo} />

                    <Route path='/link/affix' component={AffixDemo} />
                    <Route path='/link/breadcrumb' component={BreadcrumbDemo} />
                    <Route path='/link/dropdown' component={DropdownDemo} />
                    <Route path='/link/menu' component={MenuDemo} />
                    <Route path='/link/pageHeader' component={PageHeaderDemo} />
                    <Route path='/link/pagination' component={PaginationDemo} />
                    <Route path='/link/steps' component={StepsDemo} />
                    
                    <Redirect   to='/home' />
                </Switch>
            </div>
        )
    }
}

export default withRouter(ContentMain);

