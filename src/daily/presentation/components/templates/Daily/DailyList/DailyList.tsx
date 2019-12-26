import * as React from 'react';
import { DailyListResponseDto } from 'src/daily/api';
import EachDaily from './EachDaily';

interface Props {
  dailys: DailyListResponseDto[]
}

const DailyList: React.FC<Props> = ({ dailys }) => <div>
  {dailys.map(daily => <EachDaily key={daily.id} daily={daily} />)}
</div>


export default DailyList;