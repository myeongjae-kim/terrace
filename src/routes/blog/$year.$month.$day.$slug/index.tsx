import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/$year/$month/$day/$slug/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/daily/$year/$month/$day/$slug/"!</div>
}
