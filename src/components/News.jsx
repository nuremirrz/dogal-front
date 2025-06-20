import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import moment from 'moment';
import stick1 from '../assets/images/branch-1.png'
import stick2 from '../assets/images/branch-2.png'
import '../styles/News.css'
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likedItems, setLikedItems] = useState({});
    const [viewedItems, setViewedItems] = useState(new Set());

    const fetchNews = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api/news`);
            setNews(response.data);
        } catch (error) {
            setError('Ошибка при загрузке новостей.');
            console.error('Ошибка при загрузке новостей:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    const toggleLike = async (id) => {
        const isLiked = likedItems[id] || false;
        const action = isLiked ? 'decrement' : 'increment';

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api/news/${id}/toggle-likes`, { action });
            setNews(prevNews =>
                prevNews.map(item =>
                    item._id === id ? { ...item, likes: response.data.likes } : item
                )
            );
            setLikedItems(prevLikedItems => ({
                ...prevLikedItems,
                [id]: !isLiked
            }));
        } catch (error) {
            console.error('Ошибка при изменении лайков:', error);
        }
    };

    const incrementViews = async (id) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api/news/${id}/increment-views`);
        } catch (error) {
            console.error('Ошибка при увеличении просмотров:', error);
        }
    };

    const handleSlideChange = (swiper) => {
        const currentSlideId = news[swiper.realIndex]?._id;
        if (currentSlideId && !viewedItems.has(currentSlideId)) {
            incrementViews(currentSlideId);
            setViewedItems((prevViewed) => new Set(prevViewed).add(currentSlideId));
        }
    };

    return (
        <>
            <h2 className="text-4xl text-center m-8 font-semibold max-[480px]:text-2xl max-[480px]:mb-6 relative">
                <span
                    className="text-green-50 rounded-xl px-5 py-2 font-custom bg-green-600 max-[480px]:px-4 transform transition-transform duration-500 hover:scale-110"
                    style={{
                        display: 'inline-block',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                        willChange: 'transform', // Оптимизация анимации
                        transformOrigin: 'center', // Центр масштабирования
                    }}
                >
                    Новости
                </span>
            </h2>
            {loading && <p className="text-center">Загрузка новостей...</p>}
            {error && <p className="text-center text-3xl font-semibold text-red-500">{error}</p>}

            {!loading && news.length > 0 ? (
                <div className="relative w-3/4 m-auto my-14 max-[480px]:my-8">
                    <Swiper
                        modules={[Autoplay]} // Подключаем модуль Autoplay
                        autoplay={{
                            delay: 1, // Интервал между переключениями (минимальный)
                            disableOnInteraction: false, // Продолжает после взаимодействия
                        }}
                        speed={15000}
                        spaceBetween={50}
                        loop={true}
                        slidesPerView={1}
                        className="swiper news-swiper bg-[#faf9f5] p-10 rounded-xl"
                        onSlideChange={handleSlideChange}
                    >
                        {news.map(item => (
                            <SwiperSlide key={item._id}>
                                <div className="news-slide h-auto grid grid-cols-2 max-[768px]:grid-cols-1 news-card hover:shadow-lg transition-transform duration-300 ease-in-out">
                                    <div className="flex items-center overflow-hidden">
                                        {item.image ? (
                                            <img
                                                alt={item.title}
                                                src={item.image}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                                            />
                                        ) : (
                                            <h1>NO News</h1>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-center p-4 max-[768px]:p-2">
                                        <h3 className="text-xl font-bold max-[768px]:text-base my-4 text-center">
                                            {item.title}
                                        </h3>

                                        <div className="text-sm text-gray-500 flex items-center justify-between mb-2">
                                            <span>{moment(item.publishedAt).format('DD MMMM YYYY')}</span>
                                            <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
                                                {item.category}
                                            </span>
                                        </div>

                                        {item.tags && item.tags.length > 0 && (
                                            <div className="flex flex-wrap mb-3">
                                                {item.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-2 mb-1"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <p className="mt-2 pl-4 text-gray-700 max-[768px]:text-sm max-[768px]:pl-0">
                                            &nbsp;&nbsp;&nbsp;&nbsp;{item.content}
                                        </p>

                                        <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
                                            <span>Просмотры: {item.views}</span>
                                            <div className="flex items-center">
                                                {likedItems[item._id] ? (
                                                    <HeartFilled
                                                        onClick={() => toggleLike(item._id)}
                                                        style={{ color: '#ff6b00', fontSize: '24px', cursor: 'pointer' }}
                                                    />
                                                ) : (
                                                    <HeartOutlined
                                                        onClick={() => toggleLike(item._id)}
                                                        className='heart'
                                                        style={{ color: '#65a30d', fontSize: '24px', cursor: 'pointer' }}
                                                    />
                                                )}
                                                <span className="ml-2 text-lg text-green-700 font-semibold">
                                                    {item.likes}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <img src={stick1} alt="stick" className="stick1" />
                    <img src={stick2} alt="stick" className="stick2" />                    
                </div>
            ) : (
                !loading && <p className="text-center">Нет доступных новостей для отображения.</p>
            )}
        </>
    );
};

export default News;
