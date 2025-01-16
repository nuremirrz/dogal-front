import React from "react";
import { Card } from "antd";
import Navbar from "../components/Navbar";
import MyFooter from "../components/MyFooter";
import "../styles/Structure.css";
import no from "../assets/images/no-photo.jpg";

const StructureKgPage = () => {
  const structureData = [
    {
      title: "Руководитель по странам СНГ",
      employees: [
        {
          name: "Аскералиева Бактыгул",
          position: "CEO",
          email: "a@example.com",
          phone: "-",
          image: no,
        },
      ],
    },
    {
      title: "Исполнительный директор",
      employees: [
        {
          name: "Бегимбаева Назгуль",
          position: "COO",
          email: "z@example.com",
          phone: "+996 706 779 949",
          image: no,
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
              name: "Бактыбеков Азат",
              position: "Менеджер",
              email: "az@example.com",
              phone: "+996 508 675 970",
              image: no,
            },
            {
              name: "Шашпорин Максат",
              position: "Менеджер",
              email: "az@example.com",
              phone: "+996 702 675 970",
              image: no,
            },
            {
              name: "Мурзабелеков Азамат",
              position: "Менеджер",
              email: "az@example.com",
              phone: "+996 504 675 970",
              image: no,
            },
          ],
        },
        {
          title: "Отдел маркетинга",
          employees: [
            {
              name: "Догдурбаева Жайна",
              position: "Маркетолог",
              email: "l@example.com",
              phone: "+996 779 187 686",
              image: no,
            },
            {
              name: "Бейшебекова Азема",
              position: "Ассистент & Маркетолог",
              email: "lr@example.com",
              phone: "+996 708 505 282",
              image: no,
            },
          ],
        },
        {
          title: "Отдел R&D и новых технологий",
          employees: [
            {
              name: "Содалиев Абай",
              position: "Инженер R&D",
              email: "talant@example.com",
              phone: "+996 555 777 888",
              image: no,
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
        <h3 className="text-center text-green-800 font-bold text-3xl mb-8">
          Наша структура в Кыргызстане
        </h3>          
        <div className="grid gap-8">
          {structureData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="section">
              {/* Заголовок секции */}
              <h4 className="text-center text-orange-600 font-bold text-2xl mb-4">
                {section.title}
              </h4>
              {/* Сотрудники секции */}
              <div
                className={
                  section.employees?.length === 1
                  ? "flex justify-center"
                  : "grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                }
              >
                {(section.employees || []).map((employee, employeeIndex) => (
                  <Card
                  key={employeeIndex}
                  className="employee-card border-2 bg-customOrange-200 border-customOrange-600 shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300"
                  >
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="w-24 h-24 rounded-full my-0 mx-auto object-cover"
                    />
                    <h4 className="text-xl text-center text-orange-600 font-bold">
                      {employee.name}
                    </h4>
                    <p className="text-center text-gray-700">{employee.position}</p>
                    <p className="text-center text-gray-600">{employee.email}</p>
                    <p className="text-center text-green-800 font-bold">
                      {employee.phone}
                    </p>
                  </Card>
                ))}
                {/* Подотделы секции */}
                {section.subDepartments &&
                  section.subDepartments.map((department, deptIndex) => (
                    <div key={deptIndex} className="mb-8">
                      <h5 className="text-centertext-orange-500 font-bold text-lg mb-4">
                        {department.title}
                      </h5>
                      <div
                        className={
                          department.employees.length === 1
                            ? "flex justify-center"
                            : "grid gap-6 grid-cols-1 sm:grid-cols-2"
                        }
                      >
                        {department.employees.map((employee, empIndex) => (
                          <Card
                            key={empIndex}
                            className="employee-card border-2  bg-customOrange-500 border-customOrange-600 shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300"
                          >
                            <img
                              src={employee.image}
                              alt={employee.name}
                              className="w-24 h-24 rounded-full my-0 mx-auto object-cover"
                            />
                            <h4 className="text-center text-orange-600 font-bold">
                              {employee.name}
                            </h4>
                            <p className="text-center text-gray-700">
                              {employee.position}
                            </p>
                            <p className="text-center text-gray-600">
                              {employee.email}
                            </p>
                            <p className="text-center text-green-800 font-bold">
                              {employee.phone}
                            </p>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
              {/* Разделитель между уровнями */}
              {sectionIndex !== structureData.length - 1 && (
                <div className="section-divider">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 mx-auto"
                  >
                    <path
                      d="M12 2v20m0 0l-5-5m5 5l5-5"
                      stroke="#ff8500"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <MyFooter />
    </>
  );
};

export default StructureKgPage;
