import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Form, Input, Button, Table, message, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import api from "../api/axios";

const NewsletterAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const fetchSubscribers = useCallback(async () => {
    setTableLoading(true);
    try {
      const { data } = await api.get("/api/subscribers/all", {
        params: { limit: 500, skip: 0 },
      });
      const items = Array.isArray(data) ? data : data?.items || [];
      setSubscribers(items);
      setFilteredSubscribers(items);
    } catch (error) {
      console.error("Ошибка загрузки подписчиков:", error);
      message.error("Не удалось загрузить подписчиков.");
    } finally {
      setTableLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value.toLowerCase();
      setSearchValue(value);
      const filtered = subscribers.filter((subscriber) =>
        subscriber.email.toLowerCase().includes(value)
      );
      setFilteredSubscribers(filtered);
    },
    [subscribers]
  );

  const onFinish = useCallback(async (values) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/subscribers/send-newsletter", values);
      const sent = data?.sent ?? 0;
      const failed = data?.failed ?? 0;
      if (failed > 0) {
        message.warning(`Рассылка завершена: доставлено ${sent}, ошибок ${failed}.`);
      } else {
        message.success(`Рассылка успешно отправлена (${sent}).`);
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Ошибка при отправке рассылки.";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(
    async (email) => {
      try {
        await api.post("/api/subscribers/unsubscribe", { email });
        message.success("Подписчик успешно удален.");
        fetchSubscribers();
      } catch (error) {
        const msg = error?.response?.data?.message || "Ошибка при удалении подписчика.";
        message.error(msg);
      }
    },
    [fetchSubscribers]
  );

  const columns = useMemo(
    () => [
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Дата подписки",
        dataIndex: "subscribedAt",
        key: "subscribedAt",
        render: (text) => dayjs(text).format('DD.MM.YYYY HH:mm'),
      },
      {
        title: "Действия",
        key: "actions",
        render: (_, record) => (
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.email)}
          />
        ),
      },
    ],
    [handleDelete]
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Массовая рассылка</h2>
      <Form onFinish={onFinish} layout="vertical" className="mb-8">
        <Form.Item
          label="Тема письма"
          name="subject"
          rules={[{ required: true, message: "Введите тему письма!" }]}
        >
          <Input placeholder="Введите тему письма" />
        </Form.Item>
        <Form.Item
          label="Текст письма"
          name="text"
          rules={[{ required: true, message: "Введите текст письма!" }]}
        >
          <Input.TextArea rows={6} placeholder="Введите текст письма" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            Отправить рассылку
          </Button>
        </Form.Item>
      </Form>

      <div className="mb-4">
        <Input
          placeholder="Поиск по email"
          value={searchValue}
          onChange={handleSearch}
          className="mb-4"
        />
      </div>

      <h3 className="text-xl font-bold mb-4">Список подписчиков</h3>
      {tableLoading ? (
        <Spin size="large" style={{ display: "block", margin: "auto" }} />
      ) : (
        <Table
          dataSource={filteredSubscribers}
          columns={columns}
          rowKey="email"
          pagination={{ pageSize: 5 }}
          bordered
        />
      )}
    </div>
  );
};

export default NewsletterAdmin;