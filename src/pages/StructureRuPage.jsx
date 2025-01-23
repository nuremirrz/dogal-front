import React from "react";
import { Card } from "antd";
import Navbar from "../components/Navbar";
import MyFooter from "../components/MyFooter";
import "../styles/Structure.css";
import no from "../assets/images/no-photo.jpg";
import sodaliev from '../assets/images/sodaliev.jpg';
import kachinov from '../assets/images/kachinov.jpg';
import askeralieva from '../assets/images/askeralieva.jpg';

const StructureRuPage = () => {
  const structureData = [
    {
      title: "Руководитель по странам СНГ",
      employees: [
        {
          name: "Аскералиева Бактыгул",
          position: "CEO",
          email: "b.askeralieva@dogaltrm.kg",
          phone: "",
          image: askeralieva,
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
              name: "Качинов Тимур",
              position: "Менеджер",
              email: "t.kachinov@dogaltrm.kg",
              phone: "+7 771 317 3022",
              image: kachinov,
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
              phone: "+996 505 675 970",
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
          Наша команда в России
        </h3>
        <div className="grid gap-8">
          {structureData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="section">
              <h4 className="text-center text-orange-600 font-bold text-2xl mb-4">
                {section.title}
              </h4>
              {section.employees && (
                <div className="employee-grid">
                  {/* Разделение карточек на строки */}
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
                                  {employee.email}</p>
                                <p className="text-center text-green-800 font-bold">
                                  {employee.phone}</p>
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

export default StructureRuPage;
