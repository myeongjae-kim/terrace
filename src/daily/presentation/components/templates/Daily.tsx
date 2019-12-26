import * as React from 'react';
import { PageTitle } from 'src/common/presentation/components/molecules';
import { DailyListResponseDto } from 'src/daily/api';

interface Props {
  dailys: DailyListResponseDto[]
  pending: boolean
  rejected: boolean
}

const Daily: React.FC<Props> = ({ dailys, pending, rejected }) => {
  return <div>
    <PageTitle title="daily" />
    <div>
      {JSON.stringify(dailys)}
    </div>
    <div>
      {JSON.stringify(pending)}
    </div>
    <div>
      {JSON.stringify(rejected)}
    </div>
  </div>
}

export default Daily;