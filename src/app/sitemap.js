export default async function sitemap() {
  const baseUrl = 'https://thegallerycreation.in';
  
  const routes = ['', '/portfolio', '/services', '/about', '/testimonials', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}
