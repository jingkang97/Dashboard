import React, {useState} from 'react';
import { Card, Button, Form, Input, Row, Col } from 'antd';

const Connection = ({ connect, disconnect, connectBtn }) => {
  const [start, setStart] = useState(false)
  const record = {
    host: 'broker.emqx.io',
    clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
    port: 8083,
  };
  const handleConnect = (values) => {
    setStart(true)
    const { host, clientId, port } = record;
    const url = `ws://${host}:${port}/mqtt`;
    const options = {
      keepalive: 30,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      rejectUnauthorized: false
    };
    options.clientId = clientId;
    connect(url, options);
  };
  const handleDisconnect = () => {
    setStart(false)

    disconnect();
  };
  return (
    // <div>
    //   {/* {alert(start)} */}
    //   {start ? <Button danger onClick={handleDisconnect}>Disconnect</Button> : 
    //     <Button type="primary" onClick={handleConnect}>{connectBtn}</Button>
    //   }
    // </div>
    <Card
      title="Connection"
      actions={[
        <Button type="primary" onClick={handleConnect}>{connectBtn}</Button>,
        <Button danger onClick={handleDisconnect}>Disconnect</Button>
      ]}
    >
    </Card>
  );
}

export default Connection;