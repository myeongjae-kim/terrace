import { Link } from '@tanstack/react-router';

const PageCurrent = (props: {
  to: React.ComponentProps<typeof Link>['to'];
  pageNumber: number | string;
}) => {
  return (
    <Link
      to={props.to}
      aria-current="page"
      className="z-10 mx-0.5 flex h-8 items-center justify-center rounded bg-blue-50 px-3 leading-tight text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white"
    >
      {props.pageNumber}
    </Link>
  );
};

export default PageCurrent;
