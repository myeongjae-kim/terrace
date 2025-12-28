import { injectable } from 'inversify';

// Singleton으로 bean을 등록해야 컴포넌트를 여러 번 get해도 한 번만 생성한다 (실행했을 때 생성자에서 남기는 로그가 출력되지 않는다).
export const Component = () => injectable('Singleton');
