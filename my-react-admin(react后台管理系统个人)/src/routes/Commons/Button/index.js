import React from 'react'
import Nav from '../../../components/CustomBreadcrumb/index'
import { Typewriter } from 'react-typewriting-effect'
import 'react-typewriting-effect/dist/index.css'
import { Button, Row, Col, Card, Radio, Dropdown, Menu, message, Tooltip } from 'antd'
import { DownloadOutlined, SearchOutlined,PoweroffOutlined  } from '@ant-design/icons'
class ButtonDemo extends React.Component {
  state = {
    size: 'default'
  }

  handleSizeChange = (e) => {
    this.setState({
      size: e.target.value,
      loading: false,
      iconLoading: false
    })
  }


  handleMenuClick(e) {
    message.info(`Click on menu ${e.key} item.`)
  }
  render() {
    const { size, loading, iconLoading } = this.state
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Nav />
        <Card title="何时使用" bordered={false} style={{ width: '100%', boxShadow: '0 0 5px 5px #ccc', marginBottom: 15 }}>
          <Typewriter
            string="标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。"
            delay={50}
            stopBlinkinOnComplete
            cursor='_'
          />
        </Card>
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false} className='card-item'>
              <Button type="primary">Primary</Button>&emsp;
              <Button>Default</Button>&emsp;
              <Button type="dashed">Dashed</Button>&emsp;
              <Button type="danger">Danger</Button>
              <Button type="link">Link</Button>
            </Card>
            <Card bordered={false} className='card-item'>
              <Radio.Group value={size} onChange={this.handleSizeChange}>
                <Radio.Button value="large">Large</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
              <p style={{ marginTop: '1em' }}>
                <Button type="primary" size={size}>Primary</Button>&emsp;
                <Button size={size}>Default</Button>&emsp;
                <Button type="dashed" size={size}>Dashed</Button>&emsp;
                <Button type="danger" size={size}>Danger</Button>
              </p>
              <p>
                <Button shape='circle' type='primary' icon={<DownloadOutlined />} size={size} />&emsp;
                <Button type="primary" icon={<DownloadOutlined />} size={size}>Download</Button>
              </p>
              <div>
                <Button.Group size={size}>
                  <Button>Backward</Button>&emsp;
                  <Button>Forward</Button>
                </Button.Group>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false} className='card-item'>
              <p>
                <Button type="primary" shape="circle" icon={<SearchOutlined />} />&emsp;
                <Button type="primary" icon={<SearchOutlined />} >Search</Button>&emsp;
                <Button shape="circle" icon={<SearchOutlined />} />&emsp;
                <Button icon={<SearchOutlined />} >Search</Button>&emsp;
              </p>
              <p style={{ marginBottom: 0 }}>
                <Tooltip title="search">
                  <Button shape="circle" icon={<SearchOutlined />} />&emsp;
                </Tooltip>
                <Button icon={<SearchOutlined />} >Search</Button>&emsp;
                <Button type="dashed" shape="circle" icon={<SearchOutlined />} />&emsp;
                <Button type="dashed" icon={<SearchOutlined />} >Search</Button>
              </p>
            </Card>
            <Card bordered={false} className='card-item'>
              <Button type="primary">primary</Button>&emsp;
              <Button>secondary</Button>&emsp;
              <Dropdown overlay={menu}>
                <Button>Button</Button>
              </Dropdown>
            </Card>
            <Card bordered={false} className='card-item'>
              <p>
                <Button loading type='primary'>Loading</Button>&emsp;
                <Button type='primary' loading shape='circle' />
              </p>
              <div>
                <Button loading={loading} onClick={()=>this.setState({loading: true})}>Click me</Button>&emsp;
                <Button loading={iconLoading} onClick={() => this.setState({ iconLoading: true })} icon={<PoweroffOutlined  />}>Click
                  me</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ButtonDemo;