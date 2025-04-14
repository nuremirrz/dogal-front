import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { writeFile } from 'fs/promises';

// Список стран
const countries = ['kyrgyzstan', 'kazakhstan', 'russia', 'uzbekistan'];

// Список областей для Кыргызстана
const kyrgyzstanRegions = [
  'chuy',
  'issyk-kul',
  'osh',
  'talas',
  'jalalabad',
  'naryn',
  'batken',
];

// Генерируем роуты для /tech-sup/:country
const techSupportLinks = countries.map(country => ({
  url: `/tech-sup/${country}`,
  changefreq: 'weekly',
  priority: 0.7,
}));

// Генерируем роуты для /structure/:country
const structureLinks = countries.map(country => ({
  url: `/structure/${country}`,
  changefreq: 'weekly',
  priority: 0.7,
}));

// Генерируем роуты для областей Кыргызстана: /tech-sup/kyrgyzstan/[region]
const kyrgyzstanRegionLinks = kyrgyzstanRegions.map(region => ({
  url: `/tech-sup/kyrgyzstan/${region}`,
  changefreq: 'weekly',
  priority: 0.6,
}));

// Основной массив роутов
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/products', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  ...techSupportLinks,
  ...structureLinks,
  ...kyrgyzstanRegionLinks, 
];

const stream = new SitemapStream({ hostname: 'https://dogal.vercel.app/' });

const xml = await streamToPromise(Readable.from(links).pipe(stream));

await writeFile('./public/sitemap.xml', xml.toString());

console.log('sitemap.xml создан в папке public');