import PageNavigationLink from './PageNavigationLink';
import type { Link } from '@tanstack/react-router';

const Next = (props: { to: React.ComponentProps<typeof Link>['to']; disabled?: boolean }) => {
  return (
    <PageNavigationLink direction={'next'} disabled={props.disabled} to={props.to}>
      <span className="sr-only">Next</span>
      <svg
        className="h-2.5 w-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 6 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 9 4-4-4-4"
        />
      </svg>
    </PageNavigationLink>
  );
};

export default Next;
