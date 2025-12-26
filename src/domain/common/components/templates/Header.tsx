import { Link, useLocation } from "@tanstack/react-router";
import clsx from "clsx";
import { inconsolata } from "../../domain/fonts";
import Categories from "../oragnisms/Categories";
import HeaderButton from "../oragnisms/HeaderButton";

const Header = () => {
  const pathname = useLocation();

  return <header className={'select-none'}>
    <div className={'mb-2 mt-6 flex justify-center sm:mb-5 sm:mt-10'}>
      <div>
        <Link to="/">
          <HeaderButton className={clsx(inconsolata.className, 'uppercase tracking-[3px]')}>
            Myeongjae Kim
          </HeaderButton>
        </Link>
      </div>
    </div>
    <div className={'flex justify-center'}>
      <Categories activePath={pathname.pathname} />
    </div>
  </header>
}

export default Header;