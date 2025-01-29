import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import MyFooter from "../components/MyFooter";
import "../styles/Structure.css";
import countryData from "../data/countryData";
import ErrorPage from "./ErrorPage";

gsap.registerPlugin(ScrollTrigger);
const StructurePage = () => {
  const { country } = useParams();
	const sectionRefs = useRef([]);
	const cardRefs = useRef([]);

  // Если страна не найдена, выводим сообщение
  if (!countryData[country]) {
    return <ErrorPage/>
  }

  const { title, structure } = countryData[country];

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="contact-content back py-8 px-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl text-center mb-8 font-semibold max-[480px]:text-2xl max-[480px]:mb-6 relative">
          <span
            className="text-green-50 rounded-xl px-5 py-2 font-custom bg-green-600 max-[480px]:px-4 transform transition-transform duration-500 hover:scale-110 hover:translate-y-1"
            style={{ display: 'inline-block', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', borderRadius: '10px' }}
          >
            Наша команда в {title}
          </span>
        </h2>

        <div className="grid gap-8">
          {structure.map((section, sectionIndex) => (
            <div key={sectionIndex} className="section" ref={(el) => (sectionRefs.current[sectionIndex] = el)}>
              {/* Общая логика рендеринга секций */}
              <h4 className="text-center text-green-600 font-bold text-2xl mb-4">
                {section.title}
              </h4>

              {/* Рендеринг сотрудников */}
              {section.employees && (
                <div className="employee-grid">
                  {Array.from({ length: Math.ceil(section.employees.length / 3) }).map(
                    (_, rowIndex) => (
                      <div key={rowIndex} className="employee-row">
                        {section.employees
                          .slice(rowIndex * 3, rowIndex * 3 + 3)
                          .map((employee, employeeIndex) => (
                            <Card
                              key={employeeIndex}
                              className="employee-card shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
                              ref={(el) => (cardRefs.current.push(el))}
                            >
                              {/* Карточка сотрудника */}
                              <div className="avatar-container">
                                <img
                                  src={employee.image}
                                  alt={employee.name}
                                  className="avatar-image"
                                />
                              </div>
                              <h4 className="text-xl text-center text-orange-600 font-bold">
                                {employee.name}
                              </h4>
                              <hr className="w-12 mx-auto border-orange-500 my-2" />
                              <p className="text-center text-gray-700">
                                {employee.position}
                              </p>
                              <p className="text-center text-gray-600 font-semibold">
                                {employee.email}
                              </p>
                              <p className="text-center text-green-800 font-bold">
                                {employee.phone}
                              </p>
                            </Card>
                          ))}
                      </div>
                    )
                  )}
                </div>
              )}

              {/* Рендеринг подотделов */}
              {section.subDepartments?.map((department, deptIndex) => (
                <div key={deptIndex} className="department-container mb-8">
                  <h5 className="text-center text-orange-500 font-bold text-lg mb-4">
                    {department.title}
                  </h5>
                  <div className="employee-grid">
                    {Array.from({
                      length: Math.ceil(department.employees.length / 3),
                    }).map((_, rowIndex) => (
                      <div key={rowIndex} className="employee-row">
                        {department.employees
                          .slice(rowIndex * 3, rowIndex * 3 + 3)
                          .map((employee, empIndex) => (
                            <Card
                              key={empIndex}
                              className="employee-card shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
                            >
                              <div className="avatar-container">
                                <img
                                  src={employee.image}
                                  alt={employee.name}
                                  className="avatar-image"
                                />
                              </div>
                              <h4 className="text-xl text-center text-orange-600 font-bold">
                                {employee.name}
                              </h4>
                              <hr className="w-12 mx-auto border-orange-500 my-2" />
                              <p className="text-center text-gray-700">
                                {employee.position}
                              </p>
                              <p className="text-center text-gray-600 font-semibold">
                                {employee.email}
                              </p>
                              <p className="text-center text-green-800 font-bold">
                                {employee.phone}
                              </p>
                            </Card>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <MyFooter />
    </>
  );
};

export default StructurePage;