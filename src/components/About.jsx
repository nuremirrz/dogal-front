import { Card } from 'antd'
import sliderLogo from '../assets/images/slider.png'

const About = () => {
  return (
    <>
      <h2 className='text-4xl text-center m-8 font-semibold'>
        <span 
          className='text-green-50 px-5 italic font-custom bg-green-600' 
          style={{clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)'}}>О Компании
        </span>
      </h2>
      <div className="about-company grid grid-cols-2 gap-4 p-8">
        <Card className='grid grid-cols-1'>
          <h3 className='text-2xl mb-5 font-semibold'>Наше видение и ценности</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, nihil reiciendis aut corporis laudantium explicabo odit natus eaque optio laborum, in saepe impedit doloremque ipsam ullam nisi praesentium voluptates voluptatum eligendi minima tempore asperiores soluta.</p>
        </Card>
        <Card><img src={sliderLogo} alt="companyPhoto" /></Card>
      </div>
    </>
  )
}

export default About