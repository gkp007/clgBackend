const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const { Blog } = require('../models/Blog');

const generateSitemap = async (baseUrl) => {
  // Get all published blogs
  const blogs = await Blog.find({ isPublished: true }).select('_id date');

  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/api/colleges', changefreq: 'weekly', priority: 0.8 },
    { url: '/api/submissions', changefreq: 'monthly', priority: 0.7 },
    { url: '/api/interestForm', changefreq: 'monthly', priority: 0.7 },
    { url: '/api/contactUs', changefreq: 'monthly', priority: 0.7 },
    { url: '/api/blogs', changefreq: 'daily', priority: 0.9 },
  ];

  // Add blog URLs to sitemap
  blogs.forEach(blog => {
    links.push({
      url: `/api/blogs/${blog._id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: blog.date
    });
  });

  const stream = new SitemapStream({ hostname: baseUrl });
  return streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString()
  );
};

module.exports = { generateSitemap };