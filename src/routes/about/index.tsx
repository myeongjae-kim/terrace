import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/about/')({
  loader: () => { throw redirect({ to: "/" }) }
})