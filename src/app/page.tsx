import AboutPage from '@/app/about/page';
import { Metadata } from 'next';
import { createMetadata } from '@/app/common/domain/model/createMetadata';

export const metadata: Metadata = createMetadata();

const Home = () => {
  return <AboutPage />;
};

export default Home;
