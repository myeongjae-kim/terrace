# [웹] React + TypeScript 상황에서 SFC의 defaultProps 에러메세지 처리

요약: SFC 타입 선언에 `& { defaultProps: Partial<ICurrentComponentProps> }`를 추가합니다. `ICurrentComponentProps`는 상황에 맞게 바꿉니다.

[리액트를 다루는 기술](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791160505238&orderClick=LEA&Kc=)의 챕터 13을 TypeScript를 사용해 구현하면서 만난 문제의 [해결책](https://github.com/Microsoft/TypeScript/issues/27425#issuecomment-440936580)입니다. 전체 코드는 여기서 볼 수 있습니다: <https://github.com/myeongjae-kim/learn-react-redux-counter/tree/sfc-default-props>

TypeScript 없이 작성한 코드는 다음과 같습니다([책](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791160505238&orderClick=LEA&Kc=) 257페이지).

```javascript
// Filepath: src/components/Counter.js
import React from 'react';
import PropTypes from 'prop-types';
import './Counter.css';

const Counter = ({number, color, onIncrement, onDecrement, onSetColor}) => {
  return (
    <div
      className="Counter"
      onClick={onIncrement}
      onContextMenu={(e) => {
        e.preventDefault();
        onDecrement();
      }}
      onDoubleClick={onSetColor}
      style={{
        backgroundColor: color
      }}>
      {number}
    </div>
  )
};

Counter.propTypes = {
  number: PropTypes.number,
  color: PropTypes.string,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onSetColor: PropTypes.func
};

Counter.defaultProps = {
  number: 0,
  color: 'black',
  onIncrement: () => console.warn('onIncrement not defined'),
  onDecrement: () => console.warn('onDecrement not defined'),
  onSetColor: () => console.warn('onSetColor not defined')
};

export default Counter;
```

위의 SFC(Stateless Functional Component)에는 5개의 `props`가 있고 모두 기본값이 있습니다. 아래처럼 `props`를 지정하지 않아도 작동합니다.

```javascript
// Filepath: src/containers/App.js
import React, { Component } from 'react';
import Counter from '../components/Counter';

class App extends Component {
  render() {
    return (
      <div>
        <Counter/> // No Props
      </div>
    )
  }
}

export default App;
```

TypeScript(`version: 3.3.3333`)로 다시 쓰면 다음과 같습니다.

```javascript
// Filepath: src/components/Counter.tsx
import * as React from 'react';
import './Counter.css'

export interface ICounterProps {
  number: number
  color: string
  onIncrement: () => void
  onDecrement: () => void
  onSetColor: () => void
};

const Counter: React.SFC<ICounterProps> =
  ({ number, color, onIncrement, onDecrement, onSetColor }) => {
    return (
      <div
        className="Counter"
        onClick={onIncrement}
        onContextMenu={(e) => {
          e.preventDefault();
          onDecrement();
        }}
        onDoubleClick={onSetColor}
        style={{ backgroundColor: color }}
      >
        {number}
      </div>);
  };

Counter.defaultProps = {
  number: 0,
  color: 'black',
  onIncrement: () => console.warn('onIncrement not defined'),
  onDecrement: () => console.warn('onDecrement not defined'),
  onSetColor: () => console.warn('onSetColor not defined')
};

export default Counter;
```

```javascript
// Filepath: src/containers/App.tsx
import * as React from 'react';
import Counter from '../components/Counter'

class App extends React.Component<{}, {}> {
  render() {
    return (<div>
      <Counter />
    </div>);
  }
}

export default App;
```

`yarn start`를 하면 다음과 같은 메세지를 볼 수 있습니다.

```
.../redux-counter/src/containers/App.tsx
Type error: Type '{}' is missing the following properties from type 'ICounterProps': number, color, onIncrement, onDecrement, onSetColor  TS2739

     5 |   render() {
     6 |     return (<div>
  >  7 |       <Counter /> // No Props
       |        ^
     8 |     </div>);
     9 |   }
    10 | }
```

React + TypeScript 상황에서 `defaultProps`의 곤란함은 [React와 Typescript의 미묘한 불일치](https://medium.com/\@FourwingsY/react%EC%99%80-javascript%EC%9D%98-%EB%AF%B8%EB%AC%98%ED%95%9C-%EB%B6%88%EC%9D%BC%EC%B9%98-b8f0e2bfe05d)에 잘 나와있습니다. 다행히 TypeScript 3.0이 되면서 간단하게 해결이 가능해졌습니다. `App.tsx`의 SFC 타입 선언에서 `& { defaultProps: Partial<ICounterProps> }`를 추가합니다.

```javascript
// Filepath: src/components/Counter.tsx
const Counter: React.SFC<ICounterProps> & { defaultProps: Partial<ICounterProps> } =
  ({ number, color, onIncrement, onDecrement, onSetColor }) => {
    return (
      <div
        className="Counter"
        onClick={onIncrement}
        onContextMenu={(e) => {
          e.preventDefault();
          onDecrement();
        }}
        onDoubleClick={onSetColor}
        style={{ backgroundColor: color }}
      >
        {number}
      </div>);
  };
```

`Partial`은 Type의 모든 property를 optional로 만들어버립니다.

```typescript
/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

---

P.S.

1. 추상화의 힘에 항상 감탄합니다. [알고리즘 산책: 수학에서 제네릭 프로그래밍까지](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791160504880&orderClick=LAG&Kc=)를 사놓고 못 읽고 있는데, 얼른 읽어봐야겠습니다.
2. 블로그의 코드 하이라이팅에 [highlight.js](https://highlightjs.org/)를 쓰고있는데 `jsx`와 `tsx`를 지원하지 않습니다. [Prism.js](https://prismjs.com/)로 갈아타보도록 하겠습니다.