import { Card } from 'antd'
import sliderLogo from '../assets/slider.png'

const About = () => {
  return (
    <>
      <h2 className='text-3xl text-center m-8 font-semibold'>О Компании</h2>
      <div className="about-company grid grid-cols-2 gap-4 p-8">
        <Card>
          <h3 className='text-2xl mb-5 font-semibold'>Наше видение и ценности</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, nihil reiciendis aut corporis laudantium explicabo odit natus eaque optio laborum, in saepe impedit doloremque ipsam ullam nisi praesentium voluptates voluptatum eligendi minima tempore asperiores soluta.</p>
        </Card>
        <Card><img src={sliderLogo} alt="companyPhoto" /></Card>
      </div>
    </>
  )
}

export default About