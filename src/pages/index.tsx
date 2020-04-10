import React from 'react';
import { Table, Input, Form, Select, ConfigProvider } from 'antd';
import styles from './index.css';

export default function() {
  const [dataSource, setDataSource] = React.useState([]);

  const columns = [
    {
      title: 'Hash',
      dataIndex: 'hash',
      width: 80,
      render(value: string) {
        return (
          <a
            href={`https://github.com/ant-design/ant-design/commit/${value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {value.slice(0, 7)}
          </a>
        );
      },
    },
    {
      title: '类型',
      dataIndex: 'emoji',
      width: 180,
      render(value = '', { hash }: any) {
        return (
          <Form.Item name={[hash, 'type']} noStyle>
            <Select style={{ width: '100%' }} virtual={false} listHeight={500}>
              <Select.Option value="bug">🐞 Bug</Select.Option>
              <Select.Option value="style">💄 样式</Select.Option>
              <Select.Option value="feature">🆕 新特性</Select.Option>
              <Select.Option value="hotFeature">🔥 厉害的新特性</Select.Option>
              <Select.Option value="locale">🇨🇳 国际化</Select.Option>
              <Select.Option value="doc">📖 文档或网站</Select.Option>
              <Select.Option value="test">✅ 测试用例</Select.Option>
              <Select.Option value="notice">🛎 更新警告/提示信息</Select.Option>
              <Select.Option value="accessibility">⌨️ 可访问性</Select.Option>
              <Select.Option value="deprecated">🗑 废弃或移除</Select.Option>
              <Select.Option value="refactor">🛠 重构或工具链优化</Select.Option>
              <Select.Option value="perf">⚡️ 性能提升</Select.Option>
              <Select.Option value="rtl">⬅️ RTL</Select.Option>
              <Select.Option value="ts">🤖 TypeScript</Select.Option>
            </Select>
          </Form.Item>
        );
      },
    },
    {
      title: '中文',
      dataIndex: 'chinese',
      render(value = '', { hash }: any) {
        return (
          <Form.Item name={[hash, 'chinese']} noStyle>
            <Input />
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
            <Input />
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
            <Input />
          </Form.Item>
        );
      },
    },
  ];

  const [form] = Form.useForm();

  React.useEffect(() => {
    const changelog = (window as any).changelog || [];
    console.log(changelog);
    setDataSource(changelog);

    const formValues: Record<string, any> = {};
    changelog.forEach(({ hash, chinese = '', english = '', author = '' }: any) => {
      const values = { chinese, english, author, type: '' };

      if (english.includes('fix') || chinese.includes('修复')) {
        values.type = 'bug';
      } else if (english.includes('style') || chinese.includes('样式')) {
        values.type = 'style';
      }

      formValues[hash] = values;
    });
    form.setFieldsValue(formValues);
  }, []);

  return (
    <ConfigProvider componentSize="small">
      <div>
        <Form form={form}>
          <Table
            tableLayout="fixed"
            columns={columns}
            rowKey="hash"
            dataSource={dataSource}
            pagination={false}
            size="small"
            rowSelection={{}}
          />
        </Form>
      </div>
    </ConfigProvider>
  );
}
