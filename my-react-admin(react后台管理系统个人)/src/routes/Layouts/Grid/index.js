import React from 'react'
import Nav from '../../../components/CustomBreadcrumb/index'
import { Typewriter } from 'react-typewriting-effect'
import 'react-typewriting-effect/dist/index.css'
import { Card, Divider, Row, Col } from 'antd'
class GridDemo extends React.Component {
    render() {
        const style = { background: '#0092ff', padding: '8px 0', textAlign: 'center' };
        return (
            <div>
                <Nav />
                <Card title="栅格系统" bordered={false} style={{ width: '100%', boxShadow: '0 0 5px 5px #ccc', marginBottom: 15 }}>
                    <Typewriter
                        string="栅格化系统基于flex布局，基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来"
                        delay={50}
                        stopBlinkinOnComplete
                    />
                </Card>
                <Card style={{ width: '100%', boxShadow: '0 0 5px 5px #ccc', marginBottom: 15 }}>
                    <Divider orientation="left">Horizontal</Divider>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                    </Row>
                    <Divider orientation="left">Responsive</Divider>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                    </Row>
                    <Divider orientation="left">Vertical</Divider>
                    <Row gutter={[16, 24]}>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>col-6</div>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }

}

export default GridDemo;