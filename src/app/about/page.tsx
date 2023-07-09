import { aboutAdapter } from '@/app/about/domain/adapter/AboutAdapter';
import clsx from 'clsx';
import Link from 'next/link';
import { badScript } from '@/app/common/fonts/badScript';
import { inconsolata } from '@/app/common/fonts/inconsolata';
import { match } from 'ts-pattern';

const AboutPage = async () => {
  const about = await aboutAdapter.getAbout();

  return (
    <main className="mt-6 flex flex-col items-center justify-between gap-8 sm:mt-9">
      <div>
        <img className="w-52 rounded shadow-2xl" src={about.profile} alt={'profile image'} />
      </div>
      <div>
        <span className={clsx(badScript.className, 'text-[2rem]')}>{about.name.en}</span>
        <span className={'opacity-50'}>({about.name.kr})</span>
      </div>
      <div>
        <ul>
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
    </main>
  );
};

export default AboutPage;
