import { TanStackDevtools } from '@tanstack/react-devtools';
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import { Footer } from '@/domain/common/components/templates/Footer';
import Header from '@/domain/common/components/templates/Header';
import { suit } from '@/domain/common/domain/fonts';
import { cn } from '@/lib/utils';
import appCss from '../styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={'scroll-smooth'}>
      <head>
        <HeadContent />
      </head>
      <body className={cn(suit.className, 'flex h-screen flex-col items-center break-keep')}>
        <Header />
        <div className='flex w-full grow justify-center'>
          {children}
        </div>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
