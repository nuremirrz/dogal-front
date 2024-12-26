import React from 'react';
import { List, Card, Typography } from 'antd';
import addresses from '../data/contactData'; // Импорт данных

const { Title, Text } = Typography;

const ContactContent = () => {
  return (
    <div className="contact-content py-8 px-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-center contact-subtitle text-green-800 font-bold text-3xl mb-8">
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
              <h4 className="text-xl text-orange-600 font-bold">{item.name}</h4>
              <Text className='text-gray-700'>{item.description}</Text>
              <p className='text-gray-600 mt-2 font-medium'>{item.address}</p>
              {item.number && (
                <div className="mt-3">
                  {item.number.split('\n').map((number, index) => (
                    <p key={index} className="text-green-800 font-bold">
                      {number}
                    </p>
                  ))}
                </div>
              )}

            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ContactContent;
