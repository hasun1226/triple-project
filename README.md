# 트리플 프론트엔드 엔지니어 채용 과제

별 아이콘과 하트 아이콘은 react-icons 모듈을 사용했습니다. (추가로 필요한 라이브러리)
Mock service worker로 인해 빌드/디플로이하면 API를 사용해서 데이터를 가져올 수 없기 때문에
커맨드 프롬프트에서 npm start 명령어로 개발환경에서의 데모를 확인해주시기 바랍니다.

선택 요구사항 중, 
- GET API가 오류를 반환하면 간단한 오류 페이지를 추가했습니다. 
  (검색 결과가 없을 때 나오는 페이지와 동일한 구조의 페이지)
- 사용자가 검색어의 시작과 끝에 띄어쓰기가 있다면 제거해서 검색합니다.
- 화면의 사이즈를 줄여도 같은 레이아웃을 보이도록 했습니다.

### 과제 해결 방법

자바스크립트 빌트인 라이브러리인 fetch API를 이용했습니다.
API에서 데이터를 불러올 때, 검색 창은 그대로 고정시키기 위해 useRef hook을 사용해 데이터를 저장했습니다.
useContext를 이용해서 데이터와 검색어, 검색 결과 여부를 각 컴포넌트에 전달했습니다.
가장 먼저 구현한 것은 결과 창으로 데이터를 불러오면 검색 창 밑의 결과 창만 다시 렌더를 하였습니다.
좋아요/좋아요 취소를 누르면 해당 관광지에 대한 정보만 다시 렌더할 수 있게 하였습니다.
좋아요/좋아요 취소 시의 API 에러는 핸들링하지 않고 콘솔 에러를 적어 놓았습니다.

#### 검색 기능

검색은 0.5초마다 검색어를 확인하여 이전 검색어와 다를 때에만 검색하도록 구현했습니다.

### 구현하지 않은 것

- 좋아요/좋아요 취소 시의 인터액션을 위해 Sweet alert 라이브러리를 사용해서 팝업을 만들까 했지만 
어느정도의 라이브러리가 허용되는지 몰라서 최소한의 라이브러리만을 사용했습니다.
- 애니메이션 이미지 파일을 추가해도 되는지 몰라서 좋아요 클릭 시의 애니메이션을 구현하지 않았습니다.
- Mock service worker의 핸들러를 수정해도 되는지 몰라서 좋아요/좋아요 취소 시 좋아요 갯수를 변경하지 않았습니다.