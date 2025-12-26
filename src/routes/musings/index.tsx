import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/musings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/musings/"!</div>
}
