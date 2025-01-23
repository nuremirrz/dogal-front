import React from "react";
import { Card } from "antd";
import Navbar from "../components/Navbar";
import MyFooter from "../components/MyFooter";
import "../styles/Structure.css";
import no from "../assets/images/no-photo.jpg";
import shashporin from '../assets/images/shashporin.jpg'
import baktybekovAzat from '../assets/images/baktybekovAzat.jpg'
import myrzabelekov from '../assets/images/myrzabelekov.jpg'
import abdumomunov from '../assets/images/abdumomunov.jpg'
import sodaliev from '../assets/images/sodaliev.jpg'
import askeralieva from '../assets/images/askeralieva.jpg'

const StructureKgPage = () => {
  const structureData = [
    {
      title: "Руководитель по странам СНГ",
      employees: [
        {
          name: "Аскералиева Бактыгул",
          position: "Руководитель по странам СНГ",
          email: "b.askeralieva@dogaltrm.kg",
          phone: "",
          image: askeralieva,
        },
      ],
    },
    {
      title: "Исполнительный директор",
      employees: [
        {
          name: "Бегимбаева Назгуль",
          position: "Исполнительный директор",
          email: "nazgulbegimbaeva@dogaltrm.kg",
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
              email: "azatbaktybekuulu@dogaltrm.kg",
              phone: "+996 508 675 970",
              image: baktybekovAzat,
            },
            {
              name: "Шашпорин Максат",
              position: "Менеджер",
              email: "shashporin@dogaltrm.kg",
              phone: "+996 702 675 970",
              image: shashporin,
            },
            {
              name: "Абдумомунов Азамат",
              position: "Менеджер",
              email: "a.abdumomunov@dogaltrm.kg",
              phone: "+996 701 670 065",
              image: abdumomunov,
            },
            {
              name: "Мурзабелеков Азамат",
              position: "Менеджер",
              email: "a.murzabelekov@dogaltrm.kg",
              phone: "+996 504 675 970",
              image: myrzabelekov,
            },
          ],
        },
        {
          title: "Отдел маркетинга",
          employees: [
            {
              name: "Догдурбаева Жайна",
              position: "Маркетолог",
              email: "dogdurbaevajaina@gmail.com",
              phone: "+996 779 187 686",
              image: no,
            },
            {
              name: "Бейшебекова Азима",
              position: "Ассистент & Маркетолог",
              email: "azima131127@gmail.com",
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
              email: "abaisodaliev@dogaltrm.kg",
              phone: "+996 555 777 888",
              image: sodaliev,
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="contact-content back py-8 px-4 bg-white rounded-lg shadow-lg">
        <h3 className="text-center text-green-800 font-bold text-3xl mb-8">
          Наша команда в Кыргызстане
        </h3>
        <div className="grid gap-8">
          {structureData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="section">
              <h4 className="text-center text-orange-600 font-bold text-2xl mb-4">
                {section.title}
              </h4>
              {section.employees && (
                <div className="employee-grid">
                  {Array.from({
                    length: Math.ceil(section.employees.length / 3),
                  }).map((_, rowIndex) => (
                    <div key={rowIndex} className="employee-row">
                      {section.employees
                        .slice(rowIndex * 3, rowIndex * 3 + 3)
                        .map((employee, employeeIndex) => (
                          <Card
                            key={employeeIndex}
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
              )}
              {section.subDepartments &&
                section.subDepartments.map((department, deptIndex) => (
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

export default StructureKgPage;
