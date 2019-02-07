# MongoDB에서 DynamoDB로 (Spring Data)

하나의 유령이 세계를 배회하고 있다. AWS라는 유령이. 실리콘밸리의 모든 세력들, 즉 MS와 구글, IBM과 오라클이 유령을 사냥하려고 신성 동맹을 맺...진 않았지만, 우리 회사도 AWS를 주력으로 사용하고 있습니다.

저는 미래사업부문의 서버개발자입니다. 1월 초 서비스 아키텍쳐 리뷰 때 저희 개발팀장님이 다음과 같은 조언을 받았습니다.

> **자체 운영할 인력이 없다면 되도록 AWS서비스 이용**
>
> - RDS - AWS Aurora
> - NOSQL - AWS DynamoDB
> - CDN - AWS CloudFront

이미 다른 서버개발자분이 MongoDB를 활용하는 api를 구현해놓은 상태였고, 개발팀장님은 제게 MongoDB를 DynamoDB로 바꾸라는 미션을 내렸습니다.

Spring Data와 DynamoDB를 활용한 예제들을 찾을 수 있었지만, AWS DynamoDB SDK가 빠르게 업데이트되고 있던 시기라서 정상적으로 작동하는 예제들을 찾을 수 없었습니다. 꽤나 고생했기 때문에, 제가 공부한 것들이 DynamoDB를 활용하시려는 분들에게 도움이 될 것 같아 이 글을 적습니다.

아직 쌓여있는 데이터가 없을 때 발생한 일이라 MongoDB의 데이터를 DynamoDB로 마이그레이션 하는 작업은 없었습니다. 마이그레이션을 기대하셨다면 뒤로가기 버튼을 눌러주시면 됩니다...

프로덕션 코드를 그대로 올릴 수 없기에, 우리는 이제부터 달에서 운영하는 방명록을 만들 겁니다. 그 달이요.

| Framework or Librarise | Version |
| ---------------------- | ------- |
| Gradle                 | 5.0     |
| Spring Boot            | 2.1.2   |
| Spring Data            | 2.0.13  |



## MongoDB로 구현한 방명록





앞으로 목차

- MongoDB로 만든 달 방명록 API
  - Entity 설명
  - API설명
  - 작동하는 프론트엔드







* 달 방명록 예시로 쓰자. vuejs로 만들기.

다음 글: Gradle로 자동화된 DynamoDB 테스트 환경 구축하기
