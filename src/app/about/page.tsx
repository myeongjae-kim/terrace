import { aboutAdapter } from '@/app/about/domain/adapter/AboutAdapter';
import clsx from 'clsx';
import Link from 'next/link';
import { badScript } from '@/app/common/fonts/badScript';
import { inconsolata } from '@/app/common/fonts/inconsolata';
import { match } from 'ts-pattern';
import { Metadata } from 'next';
import { createTitle } from '@/app/common/domain/model/constants';
import { createMetadata } from '@/app/common/domain/model/createMetadata';

export const metadata: Metadata = createMetadata({
  title: createTitle('About'),
});

const AboutPage = async () => {
  const about = await aboutAdapter.getAbout();

  return (
    <main>
      <div className="mt-6 flex flex-col items-center justify-between gap-8 sm:mt-9">
        <div>
          <img
            className="h-52 w-52 select-none rounded drop-shadow-lg"
            src={about.profile}
            alt={'profile image'}
          />
        </div>
        <div className={'select-none'}>
          <span className={clsx(badScript.className, 'text-[2rem]')}>{about.name.en}</span>
          <span className={'absolute pt-4 opacity-40'}>({about.name.kr})</span>
        </div>
        <div>
          <ul className={'list-none ps-0'}>
            {about.descriptions.map((description) => (
              <li
                key={description.label}
                className={clsx(inconsolata.className, '-mb-1 leading-none')}
              >
                <div className={'flex items-center'}>
                  <div>
                    <span className="material-icons mr-1 cursor-default select-none text-base">
                      {description.icon}
                    </span>
                  </div>
                  <div className={'text-sm'}>
                    {match(!!description.href)
                      .with(true, () => <Link href={description.href}>{description.label}</Link>)
                      .with(false, () => <span>{description.label}</span>)
                      .run()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
