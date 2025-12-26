import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { inconsolata } from "../../domain/fonts";
import CategoryButton from "./CategoryButton";

const Categories = ({
  activePath,
}: {
  activePath: string;
}) => {
  const categories = ['about', 'blog', 'daily', 'musings', 'places'] as const;
  return (
    <nav className={clsx(inconsolata.className, 'text-sm')}>
      {categories.map((category) => {
        const href = `/${category}`;
        return (
          <Link key={category} to={href}>
            <CategoryButton
              active={activePath.startsWith(href) || (activePath === '/' && href === '/about')}
            >
              {category}
            </CategoryButton>
          </Link>
        );
      })}
    </nav>
  );
};

export default Categories;