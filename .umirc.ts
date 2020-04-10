import { defineConfig } from 'umi';

// ref: https://umijs.org/config/
const config =  defineConfig({
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' }
      ]
    }
  ],
  antd: {},
  title: 'antd-changelog',
})

export default config;
