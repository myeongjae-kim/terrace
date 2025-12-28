import { about } from '@/app/about/domain/about';

export const createAboutAdapter = () => {
  const getAbout = () => Promise.resolve(about);

  return { getAbout };
};

export const aboutAdapter = createAboutAdapter();
