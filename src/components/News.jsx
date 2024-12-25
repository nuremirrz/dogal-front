import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import moment from 'moment';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likedItems, setLikedItems] = useState({});
    const [viewedItems, setViewedItems] = useState(new Set()); // Список просмотренных слайдов

    const fetchNews = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/news');
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
            const response = await axios.put(`http://localhost:5000/api/news/${id}/toggle-likes`, { action });
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
            await axios.put(`http://localhost:5000/api/news/${id}/increment-views`);
        } catch (error) {
            console.error('Ошибка при увеличении просмотров:', error);
        }
    };

    const handleSlideChange = (swiper) => {
        const currentSlideId = news[swiper.realIndex]?._id; // Получаем ID текущего слайда
        if (currentSlideId && !viewedItems.has(currentSlideId)) {
            incrementViews(currentSlideId);
            setViewedItems((prevViewed) => new Set(prevViewed).add(currentSlideId));
        }
    };

    return (
        <>
            <h2 className='text-4xl text-center m-8 font-semibold max-[480px]:text-2xl max-[480px]:mb-6'>
                <span
                    className='text-green-50 px-5 italic font-custom bg-green-600 max-[480px]:px-4'
                    style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
                >
                    Новости
                </span>
            </h2>

            {loading && <p className="text-center">Загрузка новостей...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && news.length > 0 ? (
                <Swiper
                    spaceBetween={50}
                    loop={true}
                    slidesPerView={1}
                    className="w-3/4 m-auto my-14 max-[480px]:my-8"
                    onSlideChange={handleSlideChange} // Обработка смены слайдов
                >
                    {news.map(item => (
                        <SwiperSlide key={item._id}>
                            <div className="h-auto grid grid-cols-2 max-[768px]:grid-cols-1 news-card hover:shadow-lg transition-transform duration-300 ease-in-out">
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
            ) : (
                !loading && <p className="text-center">Нет новостей для отображения.</p>
            )}
        </>
    );
};

export default News;
