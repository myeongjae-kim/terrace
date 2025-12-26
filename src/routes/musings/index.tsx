import contentCss from '@/css/content.css?url';
import PageHeader from '@/domain/common/components/oragnisms/PageHeader';
import { badScript, notoSerif } from '@/domain/common/domain/fonts';
import { musingPersistenceAdapter } from '@/domain/musings/adapter/musingPersistenceAdapter';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/musings/')({
  component: RouteComponent,
  loader: () => musingPersistenceAdapter.findAll(),
  head: () => ({
    links: [{
      rel: 'stylesheet',
      href: contentCss,
    }]
  })
})

function RouteComponent() {
  const musings = Route.useLoaderData();

  return (
    <main className="flex flex-col items-center justify-between">
      <PageHeader className={badScript.className}>Quotes</PageHeader>
      <div className={'mb-14 flex max-w-xl flex-col gap-3 px-8 text-center'}>
        {musings.map((musing) => (
          <div
            key={musing.id}
            className={cn({
              [notoSerif.className]: musing.language === 'KO',
              [badScript.className]: musing.language === 'EN',
            })}
          >
            <p
              className={cn(
                'whitespace-pre-wrap text-lg leading-9',
                musing.language === 'KO' && 'italic',
              )}
            >
              “{musing.quote}”
            </p>
            <p className={cn('text-[0.9rem]', musing.language === 'KO' && 'italic')}>
              - {musing.from}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
