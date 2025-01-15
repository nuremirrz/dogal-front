import React, { useEffect, useRef } from "react";
import { Typography, Card } from "antd";
import Navbar from "../components/Navbar";
import MyFooter from "../components/MyFooter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Structure.css";
import no from '../assets/images/no-photo.jpg'

gsap.registerPlugin(ScrollTrigger);

const { Text } = Typography;

const StructureKgPage = () => {
  const cardsRef = useRef([]); // Массив для хранения рефов карточек

  useEffect(() => {
    // GSAP-анимация появления карточек
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".contact-content",
          start: "top 80%",
        },
      }
    );
  }, []);

  const structureData = [
    {
      title: "Главный директор",
      employees: [
        {
          name: "Айбек К.",
          position: "CEO",
          email: "aibek@example.com",
          phone: "+996 555 123 456",
          image: no,
        },
      ],
    },
    {
      title: "Управляющий",
      employees: [
        {
          name: "Жанар А.",
          position: "COO",
          email: "zhanar@example.com",
          phone: "+996 555 654 321",
          image: "/images/coo.jpg",
        },
      ],
    },
    {
      title: "Отделы",
      subDepartments: [
        {
          title: "Отдел продаж",
          employees: [
            {
              name: "Алмаз Б.",
              position: "Менеджер по продажам",
              email: "almaz@example.com",
              phone: "+996 555 111 222",
              image: "/images/sales1.jpg",
            },
            {
              name: "Асель Т.",
              position: "Специалист по продажам",
              email: "assel@example.com",
              phone: "+996 555 333 444",
              image: "/images/sales2.jpg",
            },
          ],
        },
        {
          title: "Отдел маркетинга",
          employees: [
            {
              name: "Эльмира С.",
              position: "Маркетолог",
              email: "elmir@example.com",
              phone: "+996 555 555 666",
              image: "/images/marketing.jpg",
            },
          ],
        },
        {
          title: "Отдел R&D и новых технологий",
          employees: [
            {
              name: "Талант М.",
              position: "Инженер R&D",
              email: "talant@example.com",
              phone: "+996 555 777 888",
              image: "/images/rd.jpg",
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="contact-content py-8 px-4 bg-white rounded-lg shadow-lg">
        <h3 className="text-center contact-subtitle text-green-800 font-bold text-3xl mb-8">
          Наша структура в Кыргызстане
        </h3>
        <div className="hierarchy-container">
          {/* Главный директор */}
          <div className="hierarchy-level">
            {structureData[0].employees.map((employee, index) => (
              <Card
                key={index}
                className="address-card border-2 border-customOrange-600 shadow-md"
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full mb-4 object-cover"
                />
                <h4 className="text-xl text-orange-600 font-bold">{employee.name}</h4>
                <Text className="text-gray-700">{employee.position}</Text>
                <p className="text-gray-600 mt-2 font-medium">{employee.email}</p>
                <p className="text-green-800 font-bold">{employee.phone}</p>
              </Card>
            ))}
          </div>

          {/* Стрелка */}
          <svg className="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2v20m0 0l-5-5m5 5l5-5" stroke="orange" strokeWidth="2" fill="none" />
          </svg>

          {/* Управляющий */}
          <div className="hierarchy-level">
            {structureData[1].employees.map((employee, index) => (
              <Card
                key={index}
                className="address-card border-2 border-customOrange-600 shadow-md"
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full mb-4 object-cover"
                />
                <h4 className="text-xl text-orange-600 font-bold">{employee.name}</h4>
                <Text className="text-gray-700">{employee.position}</Text>
                <p className="text-gray-600 mt-2 font-medium">{employee.email}</p>
                <p className="text-green-800 font-bold">{employee.phone}</p>
              </Card>
            ))}
          </div>

          {/* Стрелка */}
          <svg className="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2v20m0 0l-5-5m5 5l5-5" stroke="orange" strokeWidth="2" fill="none" />
          </svg>

          {/* Отделы */}
          <div className="hierarchy-level">
            {structureData[2].subDepartments.map((department, index) => (
              <div key={index} className="department-container">
                <h4 className="text-xl text-orange-600 font-bold mb-4">{department.title}</h4>
                {department.employees.map((employee, empIndex) => (
                  <Card
                    key={empIndex}
                    className="address-card border-2 border-customOrange-600 shadow-md"
                    ref={(el) => (cardsRef.current[empIndex] = el)}
                  >
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="w-12 h-12 rounded-full mb-4 object-cover"
                    />
                    <h4 className="text-xl text-orange-600 font-bold">{employee.name}</h4>
                    <Text className="text-gray-700">{employee.position}</Text>
                    <p className="text-gray-600 mt-2 font-medium">{employee.email}</p>
                    <p className="text-green-800 font-bold">{employee.phone}</p>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <MyFooter />
    </>
  );
};

export default StructureKgPage;
