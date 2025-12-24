'use client';

import React, { type JSX } from 'react';
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
          if (document.documentElement.scrollTop === 0) {
            // 글 목록에서 글 상세로 이동했을 때 끝쪽의 heading에 highlight가 되는 버그가 있음.
            // scroll이 제일 위에 있을 때는 highlight를 하지 않음으로서 버그 해결
            return;
          }

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
            element.classList.add(constants.TOC_LINK_DEFAULT_CLASS_NAME);
          });
          if (elementInOrOut === 'in') {
            tocLinks[targetLinkIndex]?.classList?.remove(constants.TOC_LINK_DEFAULT_CLASS_NAME);
            tocLinks[targetLinkIndex]?.classList?.add('font-bold');
          } else {
            tocLinks[targetLinkIndex - 1]?.classList?.remove(constants.TOC_LINK_DEFAULT_CLASS_NAME);
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
