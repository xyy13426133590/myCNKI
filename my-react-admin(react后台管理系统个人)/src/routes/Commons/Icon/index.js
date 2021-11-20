import React from 'react'
import Nav from '../../../components/CustomBreadcrumb/index'
import { Typewriter } from 'react-typewriting-effect'
import 'react-typewriting-effect/dist/index.css'
import { Card} from 'antd'
import { createFromIconfontCN,MessageOutlined   } from '@ant-design/icons'
class IconDemo extends React.Component {
    render() {
        return (
            <>
                <Nav />
                <Card title="Icon图标" bordered={false} style={{ width: '100%', boxShadow: '0 0 5px 5px #ccc', marginBottom: 15 }}>
                    <Typewriter
                        string='语义化的矢量图形，使用图标组件，你需要@ant-design/icons图标组件包'
                        delay={50}
                        stopBlinkinOnComplete
                    />
                </Card>
                <Card title="API#" bordered={false} style={{ width: '100%', boxShadow: '0 0 5px 5px #ccc', marginBottom: 15 }}>
                    <Typewriter
                        string="从 4.0 开始，antd 不再内置 Icon 组件，请使用独立的包 @ant-design/icons。"
                        delay={50}
                        stopBlinkinOnComplete
                    />
                </Card>
                <Card title="关于 SVG 图标" bordered={false} style={{ width: '100%', boxShadow: '0 0 5px 5px #ccc', marginBottom: 15 }}>
                    <Typewriter
                        string="在 3.9.0 之后，我们使用了 SVG 图标替换了原先的 font 图标，从而带来了以下优势：

                        完全离线化使用，不需要从 CDN 下载字体文件，图标不会因为网络问题呈现方块，也无需字体文件本地部署。
                        
                        在低端设备上 SVG 有更好的清晰度。
                        
                        支持多色图标。
                        
                        对于内建图标的更换可以提供更多 API，而不需要进行样式覆盖。"
                        delay={50}
                        stopBlinkinOnComplete
                    />
                </Card>
                <Card title="自定义 font 图标" bordered={false} style={{ width: '100%', boxShadow: '0 0 5px 5px #ccc', marginBottom: 15 }}>
                    <Typewriter
                        string="在 3.9.0 之后，我们提供了一个 createFromIconfontCN 方法，方便开发者调用在 iconfont.cn 上自行管理的图标。"
                        delay={50}
                        stopBlinkinOnComplete
                    />
                 </Card>
                <Card title="自定义 SVG 图标" bordered={false} style={{ width: '100%', boxShadow: '0 0 5px 5px #ccc', marginBottom: 15 }}>
                    <Typewriter
                        string="如果使用 webpack，可以通过配置 @svgr/webpack 来将 svg 图标作为 React 组件导入。@svgr/webpack 的 options 选项请参阅 svgr 文档。"
                        delay={50}
                        stopBlinkinOnComplete
                    />
                </Card>
            </>
        )
    }
}

export default IconDemo;