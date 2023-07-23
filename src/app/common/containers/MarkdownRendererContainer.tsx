'use client';

import React from 'react';
import MarkdownRenderer from '@/app/common/components/MarkdownRenderer';
import {
  HEADING_URL_COPY_LINK_CLASS,
  TOC_DATA_HEADING_ID_PROPERTY_NAME,
  TOC_LINK_CLASS,
} from '@/app/common/domain/model/constants';
import toast from 'react-hot-toast';
import Button from '@/app/common/components/Button';

type Props = React.ComponentProps<typeof MarkdownRenderer>;

const MarkdownRendererContainer = (props: Props): JSX.Element => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.querySelectorAll(`a.${HEADING_URL_COPY_LINK_CLASS}`).forEach((element) => {
      element.attributes.removeNamedItem('onClick');
      element.addEventListener('click', () => {
        void navigator.clipboard.writeText(
          window.location.origin + window.location.pathname + element.getAttribute('href'),
        );
        toast.success('링크를 복사했습니다.');
      });
    });

    ref.current.querySelectorAll(`a.${TOC_LINK_CLASS}`).forEach((element) => {
      element.addEventListener('click', () => {
        toast.success(
          <div>
            목차로 이동했습니다.
            <a
              className={'ml-3'}
              href={`#${element.getAttribute(TOC_DATA_HEADING_ID_PROPERTY_NAME)}`}
            >
              <Button size={'xs'}>되돌아가기</Button>
            </a>
          </div>,
        );
      });
    });
  }, []);

  return <MarkdownRenderer {...props} ref={ref} />;
};

export default MarkdownRendererContainer;
