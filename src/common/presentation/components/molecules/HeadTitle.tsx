import Head from 'next/head';
import * as React from 'react';
import { TITLE_POSTFIX } from 'server/common/utils/Constants';

interface Props {
  title: string
}

const HeadTitle: React.SFC<Props> = ({ title }) => <Head>
  <title>{title}{TITLE_POSTFIX}</title>
</Head>

export default HeadTitle;