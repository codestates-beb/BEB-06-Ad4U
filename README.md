<div id=readme-top><div>

# Advertisement For You (Ad4U)


<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://user-images.githubusercontent.com/72719325/205561063-d6c54654-31c1-4319-8bc1-4d5add334130.png" alt="Logo" width="380" height="300">
  <h3 align="center">Ad4U</h3>
  <br />
  <p align="center">
    광고 중개 플랫폼서비스
    <br />
  </p>
  
<a href="https://pollen-rocket-850.notion.site/Advertisement-For-You-Ad4U-66aa4aec4aa64fddbff4a875512caa1b">📋 Notion</a><br />
<a href="https://github.com/codestates-beb/BEB-06-Ad4U/wiki">🌐 Wiki</a><br />


</div>

<!-- Table of Contents -->
### :notebook_with_decorative_cover: Table of Contents
<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- TABLE OF CONTENTS -->

  <ol>
    <li><a href="#team">Team</a></li>
    <li><a href="#Inspiration">Inspiration</a></li>
     <li><a href="#Demonstration-video">Demonstration-video</a></li>
      <details>
          <summary>UI</summary>
        <ul>
         <li><a>메인페이지</a></li>
         <li><a>광고 조회 및 검색</a></li>
         <li><a>회원가입 및 로그인</a></li>
        </ul>
        </details>
      <details>
          <summary>Contract</summary>
        <ul>
         <li><a>광고주) 광고 업로드, 삭제 및 제안</a></li>
         <li><a>크리에이터) 광고 지원, 취소</a></li>
         <li><a>광고주) 계약 생성</a></li>
         <li><a>크리에이터) 계약 참여 서명</a></li>
         <li><a>광고주) 계약서 작성</a></li>
         <li><a>광고주, 크리에이터) 확인 or 파기 => 계약 완료</a></li>
        </ul>
        </details>
  </ol>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Team -->
### Team

<details>
  <summary>팀장 김현우</summary>
  <ul>
      :star:
      <a>Project Management</a>
      <ul>
        <li><a>프로젝트 계약 WorkFlow 기획</a></li>
        <li><a>DB Table 설계</a></li>
      </ul>
      :star:
      <a>Frontend</a>
      <ul>
          <li><a>Web3 API 작성</a></li>
          <li><a>Aws S3 구축 및 API 작성</a></li>
          <li><a>Infura IPFS API 작성</a></li>
          <li><a>광고 업로드 기능 구현</a></li>
          <li><a>계약서 작성 및 다운로드 기능 구현</a></li>
          <ul>
            <li><a>계약서 작성 : 계약서 다운로드(복사본), 암호화, IPFS 업로드 및 getTokenURI ⇒ 다중 서명 지갑에 Tx 등록 및 SBT 발행</a></li>
            <li><a>계약서 다운로드 : SBT 컨트랙트 접근 및 해당 계약에 대한 getTokenURI ⇒ IPFS 접근 후 파일 복호화 및 다운로드</a></li>
          </ul>
          <li><a>광고 상세페이지 보완</a></li>
      </ul>
      :star:
      <a>Smart Contract</a>
      <ul>
        <li><a>Smart Contract : 다중 서명, SBT(계약 증명) 발행 코드 등 전체 코드 작성 및 배포</a></li>
      </ul>
  </ul>
  <div align="right">:white_check_mark:<a href="https://github.com/apfl99">https://github.com/apfl99</a></div>
</details>
<details>
  <summary>팀원 강영아</summary>
  <ul>
      :star:
      <a>Project Management</a>
      <ul>
        <li><a>프로젝트 Frontend WorkFlow 기획</a></li>
        <li><a>프로젝트 API & Frontent WireFrame 기획</a></li>
      </ul>
      :star:
      <a>Frontend</a>
      <ul>
          <li><a>Main page 작성 및 기능구현</a></li>
          <li><a>Nav 작성 및 기능구현</a></li>
          <li><a>List page 작성</a></li>
          <li><a>기업 detail page 작성 및 기능 구현</a></li>
          <li><a>Youtube API 활용하여 크리에이터 detail부분에 크리에이터가 유튜브에 올린 영상 보여주기 구현</a></li>
          <li><a>광고 detail 부분 광고 지원하기, 취소하기 기능 구현</a></li>
          <li><a>로딩페이지 구현</a></li>
      </ul>

  </ul>
  <div align="right">:white_check_mark:<a href="https://github.com/Ellie-kang">https://github.com/Ellie-kang</a></a></div>
</details>
<details>
  <summary>팀원 이민욱</summary>
  <ul>
      :star:
      <a>Project Management</a>
      <ul>
        <li><a>프로젝트 Frontend WorkFlow 기획</a></li>
        <li><a>프로젝트 API & Frontent WireFrame 기획</a></li>
      </ul>
      :star:
      <a>Frontend</a>
      <ul>
          <li><a>Frontend API 작성</a></li>
          <li><a>로그인, 로그아웃, 회원가입 페이지 작성 및 기능구현</a></li>
          <ul>
            <li><a>Google OAuth Autorization Code를 server에 전송</a></li>
          </ul>
          <li><a>Local Storage에 로그인정보를 저장하여 session유지</a></li>
          <li><a>광고, 광고주, 크리에이터 검색기능 구현</a></li>
          <li><a>광고 제안하기, 제안받기 기능구현</a></li>
          <li><a>광고주, 크리에이터 마이페이지 작성 및 기능구현</a></li>
          <li><a>마이페이지 진행상태별 필터링 기능구현, 컴포넌트 작성</a></li>
          <li><a>contract confirm flow 개선(confirm check 기능)</a></li>
      </ul>
  </ul>
  <div align="right">:white_check_mark:<a href="https://github.com/yiminwook">https://github.com/yiminwook</a></div>
</details>
<details>
  <summary>팀원 홍찬우</summary>
  <ul>
      :star:
      <a>Project Management</a>
      <ul>
        <li><a>백엔드 WorkFlow 기획</a></li>
        <li><a>컨트랙트 WorkFlow 기획</a></li>
        <li><a>server API 설계, 문서 작성</a></li>
        <li><a>DB Table 설계</a></li>
      </ul>
      :star:
      <a>Backend</a>
      <ul>
          <li><a>AWS RDS 구축</a></li>
          <li><a>sequalize ORM를 활용하여 DB와 서버 연동</a></li>
          <li><a>미들웨어 구현(사용자 인증)</a></li>
          <li><a>user API 구현</a></li>
          <ul>
              <li><a>google API 활용하여 회원가입 및 로그인 API 구현</a></li>
              <li><a>JWT 토큰 인증 방식 구현</a></li>
              <li><a>mypage, refresh api 구현<a><li>
          </ul>
          <li><a>Client, Supplier, Advertisement 페이지별 API 구현</a></li>
          <ul>
             <li><a>main, list, detail, create, delete 등 </a></li>
          </ul>
          <li><a>계약에 대한 서버 API 구현</a></li>
           <ul>
             <li><a>apply, cancel, conference, contract, complete 등 </a></li>
          </ul>
      </ul>
  </ul>
  <div align="right">:white_check_mark:<a href="https://github.com/HCW-code">https://github.com/HCW-code</a></div>
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


      
<!-- ABOUT THE PROJECT -->
### Inspiration

세계 동영상 플랫폼 1위인 유튜브는 전세계 수많은 이용자들을 보유하고 있습니다. 이때문에 기업들은 다소 적은 비용으로 단시간에 많은 간접광고(PPL)를 내보내는 유튜브로 브랜드를 알리고 좋은 성과로 매출을 발생시키는 크리에이터를 활용한 마케팅을 선호합니다. 하지만 여기에는 몇 가지 문제점이 있습니다.

첫번째. **높은 중개수수료**
마케팅 대행사를 거치면 중개수수료가 발생합니다. 광고 제품의 종류에 따라, 마케팅 목표에 따라, 인플루언서에 따라, 여러 조건들을 따져 중개수수료를 책정합니다. 숨고에 따르면 인플루언서 마케팅 예상 견적 비용은 평균 월 123.3만원으로 산출되었습니다. (최저 비용 : 30만원 / 최고 비용 : 300만원)

<div align="center">
<img width="700" alt="insp" src="https://user-images.githubusercontent.com/72719325/205801152-8de0f7c5-faa7-4af8-8a13-83e8094896b3.png">
</div><br>

두번째. **계약서 작성 및 광고비 정산**
상호 계약의 원활한 진행을 위해 계약서를 필히 작성해야하지만 대부분의 광고 진행이 계약서 없이 진행되는 경우가 많습니다. 그러므로 크리에이터 활동을 하다보면 광고비 정산이 늦어지는 경우가 비일비재합니다. 이는 기업과 크리에이터 간의 신뢰문제가 발생할 수 있습니다.

세번째. **단방향 선택** 
대부분의 마케팅 대행사의 경우, 광고 의뢰가 들어오면 광고주의 요구사항에 따라 크리에이터를 찾아 제안하여 일을 진행합니다. 구독자 수가 적다는 이유로 광고주와 연결될 기회를 갖지 못하는 크리에이터들이 많습니다.

저희 Ad4U는 위와 같은 문제를 아래와 같이 해결하였습니다.

### 수수료 87% 절감 효과

계약 완료 기준, 발생되는 수수료는 계약 건당 평균 14만원이며, 이외 중개수수료는 0원입니다.

### **광고주 계약금 미리 예치, 전자서명**

스마트 컨트랙트 상에서 전자계약서가 생성되면서 **광고주가 계약금을 예치**하게하였고, **전자서명**으로 쉽고 빠르게 안전한 계약 체결이 가능합니다.
:: 기본 계약 템플릿 제공, 따로 계약 사항 추가 가능
:: 계약서를 토큰화하여 블록체인에 저장하는 방식(법적 증거로 사용가능)

### 양방향선택

광고주측에서 크리에이터에게 광고 제안을 보낼 수도 있을 뿐만 아니라, 크리에이터가 광고를 선택하여 지원할 수 있게 하였습니다.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- Demonstration video -->
### Demonstration-video
      
#### UI

<details>
<summary>메인페이지</summary>
<ul>
<div align="center">
<img src="https://user-images.githubusercontent.com/72719325/205683163-3728a14f-6c87-46c8-a27c-2308e5de5542.gif" alt="main">
</div>
</ul>
</details>

<details>
<summary>광고 조회 및 검색</summary>
<ul>
<div align="center">
<img src="https://user-images.githubusercontent.com/72719325/205684902-79d25881-3f8d-4971-86c7-d3da28da3eb4.gif" alt="search" >
<div>
</ul>
</details>
      
<details>
<summary>회원가입 및 로그인</summary>
<ul>
<div align="center">
<img src="https://user-images.githubusercontent.com/72719325/205685134-2447fb69-4425-4476-ac45-20fd1b58858f.gif" alt="signuplogin">
<div>
</ul>
</details>
    
#### Contract

<details>
<summary>광고주) 광고 업로드, 삭제 및 제안</summary>
<ul>
<div align="center">
<img src="https://user-images.githubusercontent.com/72719325/205687363-99d8e5dd-f179-4d94-836e-2b238193cd6e.gif" alt="create">
</div>
</ul>
</details>

<details>
<summary>크리에이터) 광고 지원, 취소</summary>
<ul>
<div align="center">
<img src="https://user-images.githubusercontent.com/72719325/205687532-1d8e9d16-4f67-4642-9146-eae96d0ffcb6.gif" alt="apply" >
<div>
</ul>
</details>
      
<details>
<summary>광고주) 계약 생성</summary>
<ul>
<div align="center">
<img src="https://user-images.githubusercontent.com/72719325/205687763-929bb810-5edf-44ee-9dd5-2785ffd7032c.gif" alt="conference">
<div>
</ul>
</details>

<details>
<summary>크리에이터) 계약 참여 서명</summary>
<ul>
<div align="center">
<img src="https://user-images.githubusercontent.com/72719325/205689231-ec0a821e-969c-47d2-97a4-afe3c808687f.gif" alt="sign">
</div>
</ul>
</details>

<details>
<summary>광고주) 계약서 작성</summary>
<ul>
<div align="center">
<img src="https://user-images.githubusercontent.com/72719325/205689355-de86dbc6-32d0-4655-82a5-1630a38fd863.gif" alt="contract" >
<div>
</ul>
</details>
      
<details>
<summary>광고주, 크리에이터) 확인 or 파기 => 완료</summary>
<ul>
<li><a>광고주</a>
<div align="center">
<img src="https://user-images.githubusercontent.com/72719325/205689739-96699802-9043-4dcf-8a9b-ad821362b3e1.gif" alt="clientcomplete">
<div>
</li>
<li><a>크리에이터</a>
<div align="center">
<img src="https://user-images.githubusercontent.com/72719325/205689747-1de2636b-9309-4e49-ac86-e342bb7da6f8.gif" alt="suppliercomplete">
<div>
</li>
</ul>
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
