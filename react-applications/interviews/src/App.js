import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

import { DATA } from './data/middle-frontend';

import 'antd/dist/antd.css';
import './App.css';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const App = () => {
  const [topic, setTopic] = useState();
  const [question, setQuestion] = useState();

  const onSelectTopic = ({ key }) => {
    setTopic(key);
  };

  const onSelectQuestion = ({ key }) => {
    setQuestion(DATA[topic].questions[key]);
  };

  return (
    <Layout>
      <Header>
        <Menu theme='dark' mode='horizontal'>
          <Menu.Item key={'md-fe-dev'}>Middle</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider mode='inline' style={{ height: '100%', borderRight: 0 }}>
          <Menu
            mode='inline'
            style={{ height: '100%', borderRight: 0, width: '300px' }}
            onClick={onSelectQuestion}
          >
            <SubMenu
              key={DATA.common.key}
              title={DATA.common.name}
              onTitleClick={onSelectTopic}
            >
              {DATA.common.questions.map((item, index) => (
                <Menu.Item key={index}>{item?.question}</Menu.Item>
              ))}
            </SubMenu>
            <SubMenu key='sub2' title='subnav 2'>
              <Menu.Item key='5'>option5</Menu.Item>
              <Menu.Item key='6'>option6</Menu.Item>
              <Menu.Item key='7'>option7</Menu.Item>
              <Menu.Item key='8'>option8</Menu.Item>
            </SubMenu>
            <SubMenu key='sub3' title='subnav 3'>
              <Menu.Item key='9'>option9</Menu.Item>
              <Menu.Item key='10'>option10</Menu.Item>
              <Menu.Item key='11'>option11</Menu.Item>
              <Menu.Item key='12'>option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px 100px' }}>
          {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
          {/*  <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
          {/*  <Breadcrumb.Item>List</Breadcrumb.Item>*/}
          {/*  <Breadcrumb.Item>App</Breadcrumb.Item>*/}
          {/*</Breadcrumb>*/}
          <Content
            className='site-layout-background'
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <>
              <h2>{question?.question}</h2>
              <div dangerouslySetInnerHTML={{ __html: question?.answer }} />
            </>
          </Content>
        </Layout>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
};

export default App;
