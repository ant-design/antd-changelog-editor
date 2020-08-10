import { defineConfig } from 'umi';

// ref: https://umijs.org/config/
const config = defineConfig({
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [{ path: '/', component: '../pages/index' }],
    },
  ],
  antd: {},
  title: 'Ant Design CHANGELOG Generator',
  favicon: 'https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png',
});

export default config;
