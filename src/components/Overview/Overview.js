import { Card, Skeleton, Row, Col, } from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './styles.css'

const Overview = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'#5a65ea' }} spin />;

    return ( 
        <div className="content">
        <Row gutter={21} style={{ marginBottom: 8 }}>
      <Col className="gutter-row" xs={21} lg={8} style={{ marginBottom: 15 }}>
      <Card  bordered={false} style={{ width: '100%', backgroundColor: '#3A3C41', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #202225'}}>
                <div style={{fontWeight:'bold', fontSize:'20px', color:'#9BA6B2'}}>Total Sessions</div>
                <Skeleton active />
        </Card>
      </Col>
      <Col className="gutter-row" xs={21} lg={8} style={{ marginBottom: 15 }}>
            <Card  bordered={false} style={{ width: '100%', backgroundColor: '#3A3C41', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #202225' }}>
                <div style={{fontWeight:'bold', fontSize:'20px', color:'#9BA6B2'}}>Number of Users</div>
                <Skeleton active />
            </Card>
      </Col>
      
      <Col className="gutter-row" xs={21} lg={8} style={{ marginBottom: 15 }}>
      <Card  bordered={false} style={{ width: '100%', backgroundColor: '#5a65ea', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #5a65ea' }}>
                <div style={{fontWeight:'bold', fontSize:'20px', color:'#9BA6B2'}}>Favourite Move</div>
                <Skeleton active />
            </Card>
      </Col>
    </Row>
    <Row >
        <Card  bordered={false} style={{ width: '100%', backgroundColor: '#3A3C41', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #202225', position:'relative' }}>
                <div style={{fontWeight:'bold', fontSize:'20px', color:'#9BA6B2'}}>Your Performance
                    <Spin indicator={antIcon} style={{position:'absolute', right:'0', top:'0', marginRight:'25px', marginTop:'30px'}}/>
                </div>
                
        </Card>

    </Row>
            
        </div>
     );
}
 
export default Overview;