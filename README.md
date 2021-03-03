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
