import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/daily/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/daily/"!</div>
}
