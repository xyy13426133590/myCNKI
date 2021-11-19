import React from 'react'
import Nav from '../../../components/CustomBreadcrumb/index'

class Mouse extends React.Component {
    constructor(props) {
        super(props)
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = {
            x: 0,
            y: 0
        }
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }

    render() {
        return (
            <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
                {/* 提供一个带有prop的函数 */}
                {this.props.render(this.state)}
            </div>
        )
    }
}

class Cat extends React.Component {
    render() {
        const mouse = this.props.mouse
        return(
            <img src="cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
        )
    }
}

const PageHeaderDemo = () => {
    return (
        <div>
            <Nav />
            <h1>移动鼠标</h1>
            <Mouse render={mouse => (
                <Cat mouse={mouse} />
            )} />
        </div>
    )
}

export default PageHeaderDemo;