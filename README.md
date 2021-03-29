"# boiler-plate-typescript"

CRA to boiler plate

구조
\_actions
\_reducer
--> Redux를 위한 폴더들

components/views
--> 이 안에는 Page들을 넣는다

components/views/Sections
--> 이 안에는 해당 페이지에 관련된 css파일이나, component들을 넣는다

App.js
--> Routing 관련 일을 처리한다

Config.js
--> 환경 변수 같은 것들을 정하는 곳이다

hoc
--> Higher Order Component의 약자
const EnhancedComponent = higherOrderComponent(WrappedComponent);
예시)
Auth(HOC)
여기서 해당 유저가 해당 페이지에 들어갈 자격이 되는지를 알아낸 후에
자격이 된다면 Admin component에 가게 해주고 아니라면 다른 페이지로 보내버린다.

utils
--> 여러 군데에서 쓰일 수 있는 것들을 이 곳에 넣어둬서 어디서든 쓸 수 있게 해줌

CORS(Cross-Origin Resource Sharing)
서로 다른 도메인끼리 Request할때는 CORS에 의해 통제당함

해결 방법

- 개발자 도구... 이건 에바고
- 프론트엔드만 고칠수있는 상황이라면 jsonp
- proxy (setupProxy.js : ts로 안됨)

ProxyServer
방화벽, 웹필터, 캐쉬데이터, 공유데이터 제공 기능
사용 이유:

1. 회사에서 직원들이나 집안에서 아이들 인터넷 사요 ㅇ제어
2. 캐쉬를 이용해 더 빠른 인터넷 이용 제공
3. 더 나은 보안 제공
4. 이용 제한된 사이트 접근 가능

Concurrently 이용해서 프론트, 백 서버 한번에 켜기

css framework 종류 for React JS
