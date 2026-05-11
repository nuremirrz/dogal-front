import no from "../assets/images/no-photo.jpg";
import shashporin from '../assets/images/shashporin.jpg';
import baktybekovAzat from '../assets/images/baktybekovAzat.jpg';
import myrzabelekov from '../assets/images/myrzabelekov.jpg';
import abdumomunov from '../assets/images/abdumomunov.jpg';
import sodaliev from '../assets/images/sodaliev.jpg';
import askeralieva from '../assets/images/askeralieva.jpg';
import kachinov from '../assets/images/kachinov.jpg';
import nuraliev from '../assets/images/nuraliev.jpg';
import karshiboev from '../assets/images/karshiboev.jpg';
import medetbekuulu from '../assets/images/medetbekuulu.jpg';

const countryData = {
  kyrgyzstan: {
      title: "Кыргызстане",
      structure: [
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
            {
              title: "Отдел продаж",
              employees: [
                {
                  name: "Элебесов Бексултан",
                  position: "Менеджер",
                  email: "b.elebesov@dogaltrm.kg",
                  phone: "+996 702 675 970",
                  image: no,
                },
                {
                  name: "Шашпорин Максат",
                  position: "Менеджер",
                  email: "shashporin@dogaltrm.kg",
                  phone: "+996 508 675 970",
                  image: shashporin,
                },
                {
                  name: "Медетбек уулу Бактыяр",
                  position: "Менеджер",
                  email: "b.medetbek@dogaltrm.uz",
                  phone: "+998 90 830 7181",
                  image: medetbekuulu,
                },
                {
                  name: "Тологонов Калыс",
                  position: "Менеджер",
                  email: "k.tologonov@dogaltrm.kg",
                  phone: "+996 704 675 970",
                  image: no,
                },
              ],
            },
            {
              title: "Отдел маркетинга",
              employees: [
                {
                  name: "Кумушбекова Айгерим",
                  position: "Маркетолог",
                  email: "a.kumushbekova@dogaltrm.kg",
                  phone: "+996700013821",
                  image: no,
                },
              ],
            },            
          ],
        },
      ],
    },
    kazakhstan: {
      title: "Казахстане",
      structure: [
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
          title: "Отделы",
          subDepartments: [
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
            {
              title: "Отдел продаж",
              employees: [
                {
                  name: "Качинов Тимур",
                  position: "Менеджер",
                  email: "t.kachinov@dogaltrm.kg",
                  phone: "+996 502 675 970",
                  image: kachinov,
                },
              ],
            },
            {
              title: "Отдел маркетинга",
              employees: [
                {
                  name: "Жунус кызы Сезим",
                  position: "Маркетолог",
                  email: "szhunusova1@gmail.com",
                  phone: "+7479217366",
                  image: no,
                },
              ],
            },            
          ],
        },
      ] // Данные из StructureKzPage
    },
    russia: {
      title: "России",
      structure: [
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
          title: "Отделы",
          subDepartments: [
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
                  name: "Кумушбекова Айгерим",
                  position: "Маркетолог",
                  email: "a.kumushbekova@dogaltrm.kg",
                  phone: "+996700013821",
                  image: no,
                },
              ],
            },            
          ],
        },
      ] // Данные из StructureRuPage
    },
    uzbekistan: {
      title: "Узбекистане",
      structure: [
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
          title: "Исполнительный директор",
          employees: [
            {
              name: "Мурзабелеков Азамат",
              position: "COO",
              email: "a.murzabelekov@dogaltrm.kg",
              phone: "+998 90 830 71 81",
              image: myrzabelekov,
            },
          ],
        },
        {
          title: "Отделы",
          subDepartments: [
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
            {
              title: "Отдел продаж",
              employees: [
                {
                  name: "Каршибаев Орозмурат",
                  position: "Менеджер",
                  email: "u.karshiboev@dogaltrm.uz",
                  phone: "+998 90 830 71 80",
                  image: karshiboev,
                },
              ],
            },
            {
              title: "Отдел маркетинга",
              employees: [
                {
                  name: "Кумушбекова Айгерим",
                  position: "Маркетолог",
                  email: "a.kumushbekova@dogaltrm.kg",
                  phone: "+996700013821",
                  image: no,
                },
              ],
            },            
          ],
        },
      ] // Данные из StructureUzPage
    }
  };

export default countryData;
