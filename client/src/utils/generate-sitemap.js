const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const sitemap = new SitemapStream({ hostname: 'https://ryan-lim.vercel.app' });

const routes = [
  '/',
  '/about',
  '/contact',
  '/projects',
];

const writeStream = createWriteStream('./public/sitemap.xml');
sitemap.pipe(writeStream);

routes.forEach(route => sitemap.write({ url: route }));
sitemap.end();