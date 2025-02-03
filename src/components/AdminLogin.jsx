import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Tooltip } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminLoggedIn', true); // Сохраняем статус авторизации
        message.success('Успешный вход в систему!');
        navigate('/admin'); // Переход в админку
      } else {
        message.error('Неверный логин или пароль!');
      }
    } catch (error) {
      message.error('Произошла ошибка. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };


  // Функция для выхода из админки
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn'); // Удаляем статус авторизации
    message.success('Вы вышли из админки.');
    navigate('/'); // Перенаправляем на страницу логина
  };

  return (
    <>
      <Tooltip title="Выйти">
        <Button
          type="text"
          icon={<LogoutOutlined style={{ fontSize: '24px' }} />}
          onClick={handleLogout}
          className="flex flex-end px-4"
        />
      </Tooltip>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Вход в админку</h1>
        <Form
          name="login"
          layout="vertical"
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item
            label="Имя пользователя"
            name="username"
            rules={[
              { required: true, message: 'Введите имя пользователя!' },
            ]}
          >
            <Input placeholder="Введите имя пользователя" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: 'Введите пароль!' },
            ]}
          >
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    </>
  );
};

export default AdminLogin;
