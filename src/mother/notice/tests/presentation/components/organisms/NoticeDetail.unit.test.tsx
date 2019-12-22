import { shallow } from 'enzyme';
import * as React from 'react';
import NoticeDetail from 'src/mother/notice/presentation/components/organisms/NoticeDetail';
import { getNoticeFixture } from '../../../infrastructure/model/Notice.unit.test';

xdescribe("NoticeDetail test", () => {
  const notice = getNoticeFixture();

  test("Render_ValidInput_ValidOutput", () => {
    expect(
      // tslint:disable-next-line: jsx-no-lambda
      shallow(<NoticeDetail notice={notice} pending={false} rejected={false} deleteNotice={() => { return }} />)
        .contains(<div>
          {JSON.stringify(notice)}
          <br />
          pending: {JSON.stringify(false)}
          <br />
          rejected: {JSON.stringify(false)}
        </div>)
    ).toBe(true)
  })
})