'use client';

import React from 'react';
import MarkdownRenderer from '@/app/common/components/MarkdownRenderer';
import { constants } from '@/app/common/domain/model/constants';
import toast from 'react-hot-toast';
import Button from '@/app/common/components/Button';

type Props = React.ComponentProps<typeof MarkdownRenderer>;

const MarkdownRendererContainer = (props: Props): JSX.Element => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    // link copy handler
    ref.current
      .querySelectorAll(`a.${constants.HEADING_URL_COPY_LINK_CLASS}`)
      .forEach((element) => {
        element.attributes.removeNamedItem('onClick');
        element.addEventListener('click', () => {
          void navigator.clipboard.writeText(
            window.location.origin + window.location.pathname + element.getAttribute('href'),
          );
          toast.success('링크를 복사했습니다.');
        });
      });

    // jump to toc handler
    ref.current.querySelectorAll(`a.${constants.TOC_LINK_CLASS}`).forEach((element) => {
      element.addEventListener('click', () => {
        toast.success(
          <div>
            목차로 이동했습니다.
            <a
              className={'ml-3'}
              href={`#${element.getAttribute(constants.TOC_DATA_HEADING_ID_PROPERTY_NAME)}`}
            >
              <Button size={'xs'}>되돌아가기</Button>
            </a>
          </div>,
        );
      });
    });

    // toc highlighter
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');

          const tocLinks = [
            ...(document.getElementById(constants.TOC_WRAPPER_NAV)?.querySelectorAll(`nav li a`) ||
              []),
          ];

          const targetLinkIndex = tocLinks.findIndex(
            (element) => element.getAttribute('href') === `#${id}`,
          );

          const interactionDirection = entry.boundingClientRect.y < 0 ? 'top' : 'bottom';
          const elementInOrOut = entry.intersectionRatio > 0 ? 'in' : 'out';

          if (interactionDirection !== 'bottom') {
            return;
          }

          tocLinks.forEach((element) => {
            element.classList.remove('font-bold');
          });
          if (elementInOrOut === 'in') {
            tocLinks[targetLinkIndex]?.classList?.add('font-bold');
          } else {
            tocLinks[targetLinkIndex - 1]?.classList?.add('font-bold');
          }
        });
      },
      {
        rootMargin: '0px 0px -70% 0px',
      },
    );

    // register observer
    ref.current.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((element) => {
      observer.observe(element);
    });
  }, []);

  return <MarkdownRenderer {...props} ref={ref} />;
};

export default MarkdownRendererContainer;
