---
name: Backend ToDoList
about: Backend ToDoList
title: ''
labels: ''
assignees: ''

---

task 1) **NodeJS 서버 생성**

- [ ]  Express를 사용하여 기본 서버를 생성하기
- [ ]  Cors 설정
- [ ]  router 설정하기
- [ ]  dotenv를 이용하여 중요정보를 환경변수로 저장하기

task 2) **DB 연결**

- [ ]  AWS RDS 구축(MySQL)
    - [ ]  optional) 이미지 DB
- [ ]  서버와 연동
- [ ]  Model 생성

task 3) **필요한 API 작성**

- [ ]  회원가입 API
    - [ ]  광고주일 경우 : userId, password, 회사명, 사업자번호, 회사 번호, 휴대전화 번호 입력받아야함
    - [ ]  유튜버일 경우 : userId, password, youtube information(Youtube Api : 채널명, 채널 구독자수 조회수, 유튜브 profileImg?…어…또 뭐가 있을까) -로그인마다 업데이트
- [ ]  로그인 API
    - [ ]  id, password 입력받고 검증 후 JWT토큰 전송
- [ ]  광고 공고 게시 API
    - [ ]  광고주 : 제목, 내용(자격요건, 우대사항), 사진, 광고 카테고리 입력
        
        DB로 Company_id 전송
        
- [ ]  메인페이지
    - [ ]  최근 10개 정도 광고 공고 API(이미 진행중인거 제외)
    - [ ]  Advanced) 유튜버 이력서
- [ ]  광고페이지
    - [ ]  전체 광고 공고 API - 모집중인 공고만
    - [ ]  상세 페이지
        - [ ]  유튜버 : 신청 광고 신청 API (버튼 누르면 광고DB에 유튜버의 Youtuber_id 삽입)
- [ ]  마이페이지
    - [ ]  광고주
        - [ ]  자기가 올린 공고 API 뿌려줌
        - [ ]  공고 삭제 API(DB에서 삭제)
        - [ ]  광고 신청 수락 API(광고 상태 진행중으로 변경)
        - [ ]  광고 수정 - advanced
    - [ ]  유튜버 : 지원한 공고 API 뿌려줌
        - [ ]  지원 취소 API
    - [ ]  광고 완료 API(광고 완료 상태로 변경) - 컨트랙트 접근해서 확인해야할듯
    - [ ]  광고 파기 API(광고 파기 상태로 변경)
