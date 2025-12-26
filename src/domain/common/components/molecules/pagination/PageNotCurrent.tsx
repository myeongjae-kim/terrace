import { Link } from '@tanstack/react-router';

const PageNotCurrent = (props: {
  to: React.ComponentProps<typeof Link>['to'];
  pageNumber: number | string;
}) => {
  return (
    <Link
      to={props.to}
      className="mx-0.5 flex h-8 items-center justify-center rounded bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    >
      {props.pageNumber}
    </Link>
  );
};

export default PageNotCurrent;
