import { musingPersistenceAdapter } from '@/app/musings/adapter/musingPersistenceAdapter';
import PageHeader from '@/app/common/components/PageHeader';
import { badScript } from '@/app/common/fonts/badScript';
import clsx from 'clsx';
import { notoSerif } from '@/app/common/fonts/notoSerif';

const MusingsPage = async () => {
  const musings = await musingPersistenceAdapter.findAll();

  return (
    <main className="flex flex-col items-center justify-between">
      <PageHeader className={badScript.className}>Quotes</PageHeader>
      <div className={'mb-14 flex max-w-xl flex-col gap-10 px-8 text-center'}>
        {musings.map((musing) => (
          <div
            key={musing.id}
            className={clsx({
              [notoSerif.className]: musing.language === 'KO',
              [badScript.className]: musing.language === 'EN',
            })}
          >
            <p
              className={clsx(
                'whitespace-pre-wrap pb-4 text-lg leading-9',
                musing.language === 'KO' && 'italic',
              )}
            >
              “{musing.quote}”
            </p>
            <p className={clsx('text-[0.9rem]', musing.language === 'KO' && 'italic')}>
              - {musing.from}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MusingsPage;
