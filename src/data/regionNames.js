// Регионы Кыргызстана — единый источник правды.
// slug используется в URL и API; name — для админки и меню; locative — для шапок «Сотрудники в …».
export const kyrgyzstanRegions = [
    { slug: 'chuy', name: 'Чуйская область', locative: 'Чуйской области' },
    { slug: 'issyk-kul', name: 'Иссык-Кульская область', locative: 'Иссык-Кульской области' },
    { slug: 'osh', name: 'Ошская область', locative: 'Ошской области' },
    { slug: 'talas', name: 'Таласская область', locative: 'Таласской области' },
    { slug: 'jalalabad', name: 'Джалал-Абадская область', locative: 'Джалал-Абадской области' },
    { slug: 'naryn', name: 'Нарынская область', locative: 'Нарынской области' },
    { slug: 'batken', name: 'Баткенская область', locative: 'Баткенской области' },
];

export const regionNames = {
    kazakhstan: 'Казахстане',
    russia: 'России',
    uzbekistan: 'Узбекистане',
    ...Object.fromEntries(kyrgyzstanRegions.map((r) => [r.slug, r.locative])),
};