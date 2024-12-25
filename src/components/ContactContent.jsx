import React from 'react';
import { List, Card, Typography } from 'antd';
import addresses from '../data/contactData'; // Импорт данных

const { Title, Text } = Typography;

const ContactContent = () => {
  return (
    <div className="contact-content">
      <h3 className="text-center contact-subtitle">
        Наши офисы и адреса
      </h3>
      <List
        grid={{
          gutter: 16, // Промежуток между карточками
          xs: 1,      // 1 колонка на маленьких экранах (мобильные)
          sm: 2,      // 2 колонки на планшетах
          md: 2,      // 2 колонки на средних экранах
          lg: 2,      // 2 колонки на больших экранах
          xl: 3,      // 3 колонки на экранах высокого разрешения
        }}
        dataSource={addresses}
        renderItem={(item) => (
          <List.Item>
            <Card className="address-card border-2 border-customOrange-600">
              <Title level={4}>{item.name}</Title>
              <Text>{item.description}</Text>
              <p>{item.address}</p>
              {item.number && (
                <i>
                  {item.number.split('\n').map((number, index) => (
                    <p key={index}>{number}</p>
                  ))}
                </i>
              )}

            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ContactContent;
