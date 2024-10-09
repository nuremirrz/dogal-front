import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from "react";
import axios from 'axios';

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news');
                console.log(response);
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        fetchNews();
    }, []);

    return (
        <>
            <h2 className='text-3xl text-center m-8 font-semibold'>Новости</h2>
            <Swiper
            spaceBetween={50} // Пробел между слайдами
            loop={true}
            slidesPerView={1} // Количество видимых слайдов (можете изменить на 2 или 3)
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className="w-3/4 m-auto" // Стиль для контейнера
        >
            {news.map(item => (
                <SwiperSlide key={item.id}>
                    <div className="h-auto grid grid-cols-2">
                        <div className="flex items-center">
                            <img
                                alt="example"
                                src={item.image}
                                className="h-full w-full object-cover" // Заполнение всей высоты и ширины
                            />
                        </div>
                        <div className="flex flex-col justify-center p-4">
                            <h3 className="text-2xl font-bold">{item.title}</h3>
                            <p className="mt-2 text-gray-700">{item.content}</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>

        </>
    );
};

export default News;
