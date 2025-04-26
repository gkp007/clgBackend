const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const generateSitemap = async (baseUrl) => {
  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/api/colleges', changefreq: 'weekly', priority: 0.8 },
    { url: '/api/submissions', changefreq: 'monthly', priority: 0.7 },
    { url: '/api/interestForm', changefreq: 'monthly', priority: 0.7 },
    { url: '/api/contactUs', changefreq: 'monthly', priority: 0.7 },
  ];

  const stream = new SitemapStream({ hostname: baseUrl });
  return streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString()
  );
};

module.exports = { generateSitemap };