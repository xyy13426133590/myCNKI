import React from 'react'
import LineChart from '../../components/Charts/LineCharts/index'
import BarChart from '../../components/Charts/BarCharts/index'
import ColumnChart from '../../components/Charts/ColumnCharts/index'
import Image from '../../components/Image/index'
import g1 from '../../assets/image/g1.jpg'
import g2 from '../../assets/image/g2.jpg'
import Nav from '../../components/CustomBreadcrumb/index'
import { Card, Col, Row } from 'antd'

class Index extends React.Component {
    render() {
        return (
            <>
            <Nav /> 
            <div className="site-card-wrapper" style={{ paddingBottom: '20px' }}>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Card title="咖啡虽苦，有你便甜" bordered={false}>
                                            <Image />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card title="微风轻轻吹起我的发梢,帽檐下的长发,迷人的背影,我知道那是你。" bordered={false}>
                                            <img alt="" src={g1} style={{ width: '220px' }} />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card title="额前的刘海下炯炯的眼神,安静中几分灵气，貌似有点可爱呢" bordered={false}>
                                            <img alt="" src={g2} style={{ width: '285px' }} />
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                            <div className="site-card-wrapper" style={{ paddingBottom: '20px' }}>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Card title="条形图" bordered={false}>
                                            <BarChart />
                                        </Card>
                                    </Col>
                                    <Col span={12}>
                                        <Card title="柱状图" bordered={false}>
                                            <ColumnChart />
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                            <div className="site-card-wrapper" style={{ paddingBottom: '20px' }}>
                                 <Row gutter={16}>
                                    <Col span={24}>
                                        <Card title="折线图" bordered={false}>
                                            <LineChart />
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                            </>
        )
    }
}

export default Index;