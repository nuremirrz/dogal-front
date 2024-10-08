import { Card, Carousel } from "antd"
import { useEffect, useState } from "react"
import axios from 'axios'

const News = () => {
    const [news, setNews] = useState([])

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news')  
                console.log(response)              
                setNews(response.data)
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }
        fetchNews()
    }, [])

    return (
        <>
            <h2 className='text-3xl text-center m-8 font-semibold'>Новости</h2>
            <Carousel autoplay autoplaySpeed={3000} draggable>
                {news.map(item => (
                    <Card
                        key={item._id}
                        title={item.title}
                        cover={
                            <img alt="example" src={item.image} style={{ height: '250px' }} />
                        }
                    >
                        <p>{item.content}</p>
                    </Card>
                ))}
            </Carousel>
        </>
    )
}

export default News