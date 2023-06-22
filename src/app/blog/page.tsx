import { blogPersistenceAdapter } from '@/app/blog/adapter/blogPersistenceAdapter';

const About = async () => {
  const articles = await blogPersistenceAdapter.findAll(1);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>blog</div>
      <div>{JSON.stringify(articles, null, 2)}</div>
    </main>
  );
};

export default About;
