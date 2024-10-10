import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState, useCallback } from "react";
import axios from 'axios';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNews = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/news');
            console.log(response);
            setNews(response.data);
        } catch (error) {
            setError('Error fetching news.');
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    return (
        <>
            <h2 className='text-4xl text-center m-8 font-semibold'>
                <span
                    className='text-green-50 px-5 italic font-custom bg-green-600'
                    style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
                >
                    Новости
                </span>
            </h2>
            {loading && <p className="text-center">Загрузка новостей...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            <Swiper
                spaceBetween={50}
                loop={true}
                slidesPerView={1}
                onSwiper={(swiper) => console.log(swiper)}
                className="w-3/4 m-auto my-14"
            >
                {news.map(item => (
                    <SwiperSlide key={item._id}>
                        <div className="h-auto grid grid-cols-2">
                            <div className="flex items-center">
                                <img
                                    alt="example"
                                    src={item.image}
                                    loading="lazy" // Отложенная загрузка
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-center p-4">
                                <h3 className="text-2xl text-center font-bold">{item.title}</h3>
                                <p className="mt-2 pl-4 text-gray-700">&nbsp;&nbsp;&nbsp;&nbsp;{item.content}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default News;
