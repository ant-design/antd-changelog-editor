import React from 'react';
import {
  Table,
  Input,
  Form,
  Select,
  ConfigProvider,
  Checkbox,
  Typography,
  Divider,
  Avatar,
} from 'antd';
import ChangeLog from './components/ChangeLog';
import styles from './index.css';

export default function () {
  const [dataSource, setDataSource] = React.useState([]);

  const columns = [
    {
      align: 'center',
      title: '',
      dataIndex: 'hash',
      width: 50,
      render(value: string, { hash }: any) {
        return (
          <Form.Item name={[hash, 'use']} valuePropName="checked" noStyle>
            <Checkbox />
          </Form.Item>
        );
      },
    },
    {
      title: 'PR',
      dataIndex: 'hash',
      width: 80,
      render(value: string, { hash }: any) {
        return (
          <div>
            <Form.Item name={[hash, 'pr']} noStyle>
              <Input />
            </Form.Item>
            <a
              href={`https://github.com/ant-design/ant-design/commit/${value}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {value.slice(0, 7)}
            </a>
          </div>
        );
      },
    },
    {
      title: '类型',
      dataIndex: 'emoji',
      width: 180,
      render(value = '', { hash }: any) {
        return (
          <>
            <Form.Item name={[hash, 'type']} noStyle>
              <Select style={{ width: '100%' }} virtual={false} listHeight={500}>
                <Select.Option value="bug">🐞 Bug</Select.Option>
                <Select.Option value="style">💄 样式</Select.Option>
                <Select.Option value="feature">🆕 新特性</Select.Option>
                <Select.Option value="hotFeature">🔥 厉害的新特性</Select.Option>
                <Select.Option value="ts">🤖 TypeScript</Select.Option>
                <Select.Option value="rtl">⬅️ RTL</Select.Option>
                <Select.Option value="notice">🛎 更新警告/提示信息</Select.Option>
                <Select.Option value="perf">⚡️ 性能提升</Select.Option>
                <Select.Option value="accessibility">⌨️ 可访问性</Select.Option>
                <Select.Option value="locale">🌐 国际化</Select.Option>
                <Select.Option value="refactor">🛠 重构或工具链优化</Select.Option>
                <Select.Option value="deprecated">🗑 废弃或移除</Select.Option>
                <Select.Option value="test">✅ 测试用例</Select.Option>
                <Select.Option value="doc">📖 文档或网站</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name={[hash, 'component']} noStyle>
              <Input style={{ marginTop: 6 }} placeholder="component name" />
            </Form.Item>
          </>
        );
      },
    },
    {
      title: '中文',
      dataIndex: 'chinese',
      render(value = '', { hash }: any) {
        return (
          <Form.Item name={[hash, 'chinese']} noStyle>
            <Input.TextArea rows={2} />
          </Form.Item>
        );
      },
    },
    {
      title: 'English',
      dataIndex: 'english',
      render(value = '', { hash }: any) {
        return (
          <Form.Item name={[hash, 'english']} noStyle>
            <Input.TextArea rows={2} />
          </Form.Item>
        );
      },
    },
    {
      title: 'Author',
      dataIndex: 'author',
      width: 100,
      render(value = '', { hash }: any) {
        return (
          <Form.Item name={[hash, 'author']} noStyle>
            <Input.TextArea rows={2} />
          </Form.Item>
        );
      },
    },
  ];

  const [form] = Form.useForm();

  React.useEffect(() => {
    const changelog = (window as any).changelog || [];
    setDataSource(changelog);

    const formValues: Record<string, any> = {};
    changelog.forEach(
      ({ hash, chinese = '', english = '', author = '', pr = '', component = '' }: any) => {
        chinese = `${chinese.trim()}。`;
        english = `${english.trim()}.`;

        chinese = chinese.replace('。。', '。');
        english = english.replace('..', '.');

        const values = { chinese, english, author, type: '', use: true, pr, component };

        if (english.includes('fix') || chinese.includes('修复')) {
          values.type = 'bug';
        } else if (english.includes('style') || chinese.includes('样式')) {
          values.type = 'style';
        } else if (english.includes('docs:')) {
          values.type = 'doc';
          values.use = false;
        }

        formValues[hash] = values;
      },
    );
    form.setFieldsValue(formValues);
  }, [form]);

  return (
    <ConfigProvider componentSize="small">
      <div className={styles.container}>
        <Typography.Title level={1}>
          <Avatar
            src="https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png"
            size="large"
            style={{ marginRight: 12, position: 'relative', top: -4 }}
          />
          CHANGELOG Generator
        </Typography.Title>
        <Form form={form} style={{ marginTop: 40 }}>
          <Table
            tableLayout="fixed"
            columns={columns as any}
            rowKey="hash"
            dataSource={dataSource}
            pagination={false}
            size="small"
          />
          <Form.Item shouldUpdate>
            {(form) => {
              const formValues = form.getFieldsValue(true);

              const hashList = dataSource.map((item: { hash: string }) => item.hash);

              return (
                <>
                  <Divider style={{ margin: '40px 0' }}>🇨🇳 中文</Divider>
                  <ChangeLog hashList={hashList} formValues={formValues} lang="chinese" />
                  <Divider style={{ margin: '40px 0' }}>🇺🇸 English</Divider>
                  <ChangeLog hashList={hashList} formValues={formValues} lang="english" />
                </>
              );
            }}
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
}
