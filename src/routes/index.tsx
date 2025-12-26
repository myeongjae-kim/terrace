import { aboutAdapter } from '@/domain/about/adapters/AboutAdapter';
import { AboutTemplate } from '@/domain/about/components/templates/AboutTemplate';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App, loader: () => aboutAdapter.getAbout()
})

function App() {
  const about = Route.useLoaderData();

  return <AboutTemplate about={about} />
}
