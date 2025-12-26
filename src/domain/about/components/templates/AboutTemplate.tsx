import { Link } from "@tanstack/react-router";
import { match } from "ts-pattern";
import { about } from "../../model/about";

type Props = {
  about: typeof about;
}

export const AboutTemplate = ({ about }: Props) => {
  return (
    <main>
      <div className="mt-6 flex flex-col items-center justify-between gap-8 sm:mt-9">
        <div>
          <img
            className="h-52 w-52 select-none rounded drop-shadow-lg"
            src={about.profile}
            alt={'profile image'}
          />
        </div>
        <div className={'select-none'}>
          <span className={'font-bad-script text-[2rem]'}>{about.name.en}</span>
          <span className={'absolute pt-4 opacity-40'}>({about.name.kr})</span>
        </div>
        <div>
          <ul className={'list-none ps-0'}>
            {about.descriptions.map((description) => (
              <li
                key={description.label}
                className={'font-inconsolata -mb-1 leading-none'}
              >
                <div className={'flex items-center'}>
                  <div>
                    <span className="material-icons mr-1 cursor-default select-none text-base">
                      {description.icon}
                    </span>
                  </div>
                  <div className={'text-sm'}>
                    {match(!!description.href)
                      .with(true, () => {
                        if (description.internal) {
                          return <Link to={description.href}>{description.label}</Link>;
                        }

                        return <a href={description.href}>{description.label}</a>;
                      })
                      .with(false, () => <span>{description.label}</span>)
                      .run()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
};