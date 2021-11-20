import React from 'react'
import Nav from '../../../components/CustomBreadcrumb/index'
import { Typewriter } from 'react-typewriting-effect'
import 'react-typewriting-effect/dist/index.css'
import { Card, Divider } from 'antd'
class DividerDemo extends React.Component {
    render() {
        return (
            <div>
                <Nav />
                <Card title="何时使用" bordered={false} style={{ width: '100%', boxShadow: '0 0 5px 5px #ccc', marginBottom: 15 }}>
                    <Typewriter
                        string="对不同章节的文本段落进行分割,对行内文字/链接进行分割，例如表格的操作列。"
                        delay={50}
                        stopBlinkinOnComplete
                    />
                </Card>
                <div style={{marginTop: 30, borderTop: 1}}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                        probare, quae sunt a te dicta? Refert tamen, quo modo.
                    </p>
                    <Divider>Text</Divider>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                        probare, quae sunt a te dicta? Refert tamen, quo modo.
                    </p>
                    <Divider orientation="left">Left Text</Divider>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                        probare, quae sunt a te dicta? Refert tamen, quo modo.
                    </p>
                    <Divider orientation="right">Right Text</Divider>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                        probare, quae sunt a te dicta? Refert tamen, quo modo.
                    </p>
                </div>
            </div>
        )
    }

}

export default DividerDemo;