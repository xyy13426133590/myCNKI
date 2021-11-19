import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";
import { WordCloud } from '@ant-design/charts'
import {
    Map,
    Marker,
    NavigationControl,
    InfoWindow,
    MapTypeControl,
    ScaleControl,
    ZoomControl,
    Circle,
    CustomOverlay,
    Label,
    BMapGL
} from 'react-bmapgl'
import Nav from '../../../components/CustomBreadcrumb/index'
const TypographyDemo = () => {
    return (
        <Router>
            <div>
                <Nav />
                <div style={{ margin: '50px auto', textAlign: 'center', fontSize: '30px' }}>
                    <Link to='/'>词云图</Link>  |
                    <Link to='/map'>地图详情</Link>
                </div>

                <hr />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/map">
                        <MapInfo />
                    </Route>
                </Switch>

            </div>
        </Router>
    )
}

function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        asyncFetch();
    }, [])

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => {
                console.log("fetch data error", err)
            })
    }

    const config = {
        data: data,
        wordField: 'name',
        weightField: 'value',
        colorField: 'name',
        wordStyle: {
            fontFamily: 'Verdana',
            fontSize: [20, 60],
            rotation: 0,
        },
        random: function random() {
            return 0.5;
        },
    }
    return (
        <div style={{ height: '' }}>
            <WordCloud  {...config} style={{ height: '500px' }} />
        </div>
    );
}

function MapInfo(props) {
    //const [positionIcon, setPosition] = useState({position:{lng: 116.404449, lat: 39.914889}, icon: 'loc_red'});
    useEffect(()=>{
        handleChange();
    })

    const handleChange = () =>{
        // setPosition = (positionIcon) =>({
        //     positionIcon: new BMapGL.Point(116.404449 + Math.random() - 0.5, 39.914889 + Math.random() - 0.5),
        //     icon: `red${Math.ceil(Math.random()*10)}`
        // })
    }

    return (
        <Map center={{ lng: 116.404449, lat: 39.914889 }} style={{ height: '600px' }}>
            <Marker 
            position={{ lng: 116.404449, lat: 39.914889 }} 
            onClick={handleChange}
            autoViewport
            viewportOptions={{
              zoomFactor: -12
            }}
            enableDragging
            />
            <NavigationControl />
            <InfoWindow position={{ lng: 116.404449, lat: 39.914889 }} text="北京市地图" title="React-Map" />
            <MapTypeControl />
            <ScaleControl />
            <ZoomControl />
            <Circle
                center={{ lng: 116.404449, lat: 39.914889 }}
                radius={5000}
                strokeColor="#f00"
                strokeWeight={2}
                fillColor="#ff0"
                fillOpacity={0.3}
            />
            <CustomOverlay  position={{lng: 116.35, lat: 39.88}}><DOM /></CustomOverlay>
            <Label  
                position={{lng: 116.35, lat: 39.88}}
                text="欢迎你在react中使用百度地图GL版"
            />
        </Map>
    );
}

//自定义dom
function DOM() {
    return <div className="custom" style={{ width: 40, height: 40, background: 'rgba(222, 0, 0, 0.8)' }}>
        <span style={{ color: '#fff' }}>DOM</span>
    </div>
}

export default TypographyDemo;