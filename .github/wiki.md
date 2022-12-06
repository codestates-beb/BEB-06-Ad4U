# Advertisement For You (Ad4U)
💎 Codestates Blockchain Engineering Bootcamp Final Project 
<br />
<br />
<br />

### ♻️ Core Configuration
<br />

<p align="center">
  <img src="./wiki_img/core_configuration.png" alt="core_configuration.png" width="800"/>
</p>
광고주가 크리에이터와 다중서명지갑을 생성하고 계약서를 생성한 후<br /> 
이를 다중서명지갑 구성원들의 Confirm과 Revoke를 통해 계약을 마무리 짓는 전체 과정을 나타낸 그림입니다.
<br />
<br />

**광고주 : 계약 생성(1)**

광고주는 크리에이터의 Address와 자신의 Address를 가지고, MultiSig Wallet을 생성합니다.

- 이때, 광고주는 Multisig Wallet의 Owner가 되며, 크리에이터의 Address는 Owner 후보에 등록됩니다.
- 여기서 Owner는 해당 계약인 Multisig Wallet의 참여자를 말하며, 광고주와 크리에이터 모두가 Owner가 되어야 계약을 진행할 수 있습니다.
<br />
<br />


**크리에이터 : 계약 참여 및 서명(3)**

크리에이터는 광고주로부터 전송받은 Multisig Wallet에 접근하여 서명함으로써 계약 참가를 알립니다.

- 이때, 크리에이터는 Owner 후보에 등록되어 있어야 하며, 정상적으로 서명이 진행되었을 경우, 크리에이터 또한 Owner에 등록됩니다.
- 크리에이터가 계약에 참여하지 않는다면, 광고주는 다음 과정인 계약 정보를 등록할 수 없습니다.
<br />
<br />


**광고주 : 계약서 작성(4)**

광고주는 크리에이터와 협의된 계약서를 작성하고 암호화된 계약 정보를 체인에 저장, 계약금을 예치합니다.

- 이때, 광고주가 작성한 계약서는 암호화 진행후, 크리에이터에게 SBT 형태로 발행됩니다.
<br />
<br />


**광고주, 크리에이터 : 계약 완료 or 계약 파기(5, 6)**

계약 완료

- 완료는 광고주와 크리에이터가 4번 과정의 계약 내용에 대해 성실히 이행됨을 확인하고,<br />  
해당 계약을 성공적으로 종료하는 것입니다. 이에 광고주와 크리에이터 모두 4번 과정의 계약 정보에 Confirm을 함으로써,<br />
해당 계약 정보의 Confirm 횟수가 2회가 되면,예치금은 자동으로 크리에이터에게 전송됩니다.

계약 파기

- 파기는 광고주나 크리에이터 둘 중 한 사람이라도 계약에 대해 마찰이 생겨 계약을 파기해야할 경우,<br /> 
한 명이라도 4번 과정의 계약 정보에 대해 Revoke를 하게 되면, 그 즉시 계약 파기로 간주하고 예치금은 광고주에게 다시 전송됩니다.
    - 이 때, 계약서(SBT)는 파기되지 않습니다.
<br />
<br />

***
<br />


### 🛠 Wire Frame
<br />

<p align="center">
  <img src="./wiki_img/wire_frame/1.mainLogin.png" alt="1.mainLogin.png" width="800"/>
  <img src="./wiki_img/wire_frame/2.listDetail.png" alt="2.listDetail.png" width="800"/>
  <img src="./wiki_img/wire_frame/3.mypage.png" alt="3.mypage.png" width="800"/>
</p>
<br />
<br />

***
<br />

### 📝 Work Flow
<br />


<p align="center">
  <img src="./wiki_img/work_flow/1.frontend.png" alt="1.frontend.png" width="800"/>
</p>
<br />

#### Frontend

1. 로그인 여부를 확인하여 Nav의 구성이 바뀝니다.
    - 로그인되어있지 않은 경우, 프로필 이미지 대신에 로그인 버튼이 활성화가 됩니다.
    - 로그인 여부는 LocalStorage의 로그인 데이터의 유무로 판단됩니다.
    - 리프레쉬 쿠키가 있는 경우, refresh API에 의해서 로그인정보를 서버로부터 받아오고 로그인 상태로 변경됩니다.

2. 로그인 되어있지 않은경우, 크리에이터 또는 광고주 계정으로 로그인 할 수 있습니다.

3. 회원가입 해야하는 경우, 서버로부터 구글 OAuth 주소를 받아오고 동의화면으로 이동됩니다. 
    - 개인정보 이용동의를 마친 후, authorization code를 서버로 전송하고 구글 email를 받아옵니다.
    - 회원가입 modal를 통해 추가적인 유저정보를 입력하여 서버로 전송하면 회원가입이 완료됩니다.

4. 메인페이지
    - AD4U 프로젝트의 대한 Intro를 확인할 수 있습니다.
    - AD4U를 통해 배포(Deploy)된 모든 Multi-Sig Wallet의 수수료 거래량을 확인 할 수 있습니다.
    - 광고, 광고주, 크리에이터에 대한 최신목록을 대략적으로 확인가능합니다.

5. 리스트페이지
    - 광고, 광고주, 크리에이터에 대한 전체목록을 확인 할 수 있습니다.
    - 검색창을 통하여 필터링을 할 수 있습니다.
    - 광고, 광고주, 크리에이터 카드를 선택하여 상세페이지로 이동할 수 있습니다.

6. 상세페이지
    - 해당 광고, 광고주, 크리에이터에 대한 상세 정보를 확인할 수 있습니다.
    - 광고주는 크리에이터 상세페이지에서 광고를 제안(Propose)할 수 있습니다.
    - 크리에이터는 광고 상세페이지에서 지원신청(Apply)을 할 수 있습니다.

7. 마이페이지
    - 광고주 마이페이지
        - 회사의 정보를 확인하고 modal을 열어 회사정보를 수정할 수 있습니다.
            - 첨부된 회사 이미지 파일은 AWS S3에 올리고 Img_URL을 받아 서버로 전송합니다
        - 광고 업로드 페이지로 이동하여 광고를 업로드 할 수 있습니다.
            - 첨부된 광고 이미지 파일은 AWS S3에 올리고 Img_URL을 받아 서버로 전송합니다.
        - **모집중**인 광고에서 크리에이터를 선택(Select)하여 Multi-Sig Wallet 배포(Deploy) 할 수 있습니다.
        - **진행중**인 광고에서 계약서 작성페이지로 이동할 수 있습니다.
            - 광고주는 계약서 작성페이지에서 최종적으로 협의된 계약서를 IPFS에 업로드하여 Token_URI를 발급받고 SBT Token을 Mint할 수 있습니다.
        - **진행중**인 광고에서 컨펌(Confirm) 또는 파기(Revoke) 할 수 있습니다.
        - **진행중**, **완료**, **파기**된 광고의 계약서를 다운받을 수 있습니다.
    - 크리에이터 마이페이지
        - 회원가입시 등록한 지갑주소(Account)를 확인할 수 있습니다.
        - 제안받은 광고에서 제안(Propose)은 수락 또는 거부 할 수 있습니다.
            - 제안을 수락하면 해당 광고를 지원신청(Apply)한 상태가 됩니다.
        - **모집중**인 광고에서 지원취소(Cancel)을 할 수 있습니다.
        - **협의중**인 광고에서 Multi-Sig Wallet에 서명(Sign) 할 수 있습니다.
        - **진행중**인 광고에서 컨펌(Confirm) 또는 파기(Revoke) 할 수 있습니다.
        - **진행중**, **완료**, **파기**된 광고의 계약서를 다운받을 수 있습니다.

***
<br />


<p align="center">
  <img src="./wiki_img/work_flow/2.backend.png" alt="2.backend.png" width="800"/>
</p>
<br />

#### Backend
<br />

1. 회원가입시 광고주와 크리에이터로 나누어서 회원가입을 진행합니다.
    - 광고주 : google 계정정보(google email)를 oauth 를 통해 불러오며 그 외의 필요한 정보들을 입력하고 회원가입을 진행합니다.
    - 크리에이터 : google 계정정보(google email)와 youtube 채널 정보(채널명, 구독자수 등)를<br />
oauth와 accessToken으로 불러오며 그 외의 필요한 정보들을 입력하고<br /> 
회원가입을 진행합니다. 크리에이터로 회원가입할때 google에서 받은<br /> 
refreshToken은 DB에 저장하여 로그인 크리에이터가 로그인할때마다<br /> 
youtube 채널 정보를 최신화하기 위해 사용합니다.<br />
2. 광고주 또는 크리에이터로 로그인을 진행하며 이로인해 로그인 했을때 사용할 수 있는 기능들이 달라집니다.<br /> 
로그인 후 인증은 JWT토큰을 사용하여 구현하였습니다.
    - 광고주 기능 : 광고모집글 작성, 광고모집글 삭제, 크리에이터에게 광고 제안, 계약 협의, 계약서 작성, 계약서 확인, 계약 confirm/revoke
    - 크리에이터 기능 : 모집중인 광고에 신청, 광고주가 협의를 진행할 시 이를 수락/거절, 계약서 확인, 계약 confirm/revoke
3. 광고주는 광고모집 게시글을 작성할 수 있으며 이를 삭제할 수 있습니다.
4. 크리에이터는 광고모집 게시글에 자신의 채널로 신청할 수 있습니다. 또는 광고주가 광고를 제안할 시에 제안을 수락하면 자동으로 신청됩니다.
5. 광고주는 신청한 크리에이터들 중에 한 명을 선택 후 협의를 진행합니다. 이때 MultisigWallet이 생성되며 생성된 지갑의 주소를 DB에 저장합니다.
6. 크리에이터는 협의가 들어왔을때 수락 또는 거절을 할 수 있습니다.
7. 광고주는 크리에이터가 협의를 끝내고 수락시 계약서를 작성합니다. 이를 체인에 등록하고 SBT로 만들어서 토큰 주소와 id, uri를 DB에 저장합니다.
8. 계약이 무사히 완료되면 양쪽의 confirm을 통해 계약을 완료할 수 있고 한 명이 revoke를 하면 계약을 파기할 수 있습니다.

***
<br />

<p align="center">
  <img src="./wiki_img/work_flow/3.smart_contract.png" alt="3.smart_contract.png" width="800"/>
</p>
<br />

#### Smart contract
<br />

1. Multi-Sig Wallet 배포
    - 광고주는 자신이 계약할 크리에이터의 주소를 인자값으로 Wallet을 생성함으로써 계약을 시작합니다.
    - 이 때, Multi-Sig Wallet은 광고주가 Owner로 등록되며, 크리에이터는 Owner 후보로 등록됩니다.
2. SupplierSign
    - 크리에이터가 계약에 참여함을 서명하는 함수로, 해당 함수는 1번 과정에서 등록된 Owner 후보 주소로만 서명이 가능합니다.
    - 이 과정을 통해 Owner가 2명이 되어야만 계약을 진행할 수 있습니다.
3. SubmitTransaction
    - 광고주가 계약을 진행하기 위해 계약서를 작성한 후 실행하는 함수로,  계약서 내용에 따라 크리에이터에게, 얼마를 보낼 것인지, 암호화된 계약서 IPFS Link가 인자값으로 들어갑니다.
    - 이 과정에서 암호화된 계약서 IPFS Link는 계약 증명을 위한 SBT 토큰의 URI로 들어가며, 크리에이터 주소로 발행됩니다.
    - 또한, 계약 완료시 자동으로 실행될 트랜잭션을 등록합니다.
        - 트랜잭션에는 크리에이터에게 얼마를 보낼 것인지와 암호화된 계약서 IFPS Link가 데이터로 들어갑니다.
        - 이 과정에서 계약 금액은 Multi-Sig Wallet에 예치됩니다.
4. ConfirmTransaction
    - 광고주와 크리에이터가  등록된 트랜잭션 수행에 대한 승인 의사를 나타낼 수 있는 함수로,  3번 과정에서 등록된 트랜잭션에 대해 실행할 것인지 각자 의견을 Confirm을 통해 나타냅니다.
    - 3번 과정에서 등록된 트랜잭션의 Confirm 횟수가 2회가 되면, 광고주와 크리에이터 모두 승낙한 것이기 때문에 등록된 트랜잭션이 자동으로 수행되며, 이 경우 크리에이터는 예치금을 받게 됩니다.
    - 해당 트랜잭션은 실행됨 상태로 저장됩니다.
5. RevokeTransaction
    - 광고주나 크리에이터 둘 중 한 명이 등록된 트랜잭션 수행에 대한 거부 의사를 나타낼 수 있는 함수로, 3번 과정에서 등록된 트랜잭션에 대해 거부할 것인지 각자 의견을 Revoke를 통해 나타냅니다.
    - 이 경우, 한 명이라도 Revoke를 통해 거부 의사를 나타낸다면, 파기로 간주하고 예치금은 광고주에게 돌아갑니다.
    - 해당 트랜잭션은 파기됨 상태로 저장됩니다.

***
<br />

### 📦 Technical-Stack
<br />

<p align="center">
  Frontend
  <br />
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <br />
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> 
  <img src="https://img.shields.io/badge/React Router DOM-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
  <br />
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/aws s3-569A31?style=for-the-badge&logo=amazons3&logoColor=black">
  <br />
  <img src="https://img.shields.io/badge/ipfs http client-65C2CB?style=for-the-badge&logo=ipfs&logoColor=white">
  <img src="https://img.shields.io/badge/Web3.js-F16822?style=for-the-badge&logo=Web3.js&logoColor=white">
  <img src="https://img.shields.io/badge/env-ECD53F?style=for-the-badge&logo=.env&logoColor=black">
</p>
<br />

<p align="center">
  Backend
  <br />
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> 
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
  <br />
  <img src="https://img.shields.io/badge/MySQL2-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
  <br />
  <img src="https://img.shields.io/badge/Sequelize_cli-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
  <img src="https://img.shields.io/badge/Sequelize_auto-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
  <br />
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/env-ECD53F?style=for-the-badge&logo=.env&logoColor=black">
  <br />
  <img src="https://img.shields.io/badge/aws rds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=black">
  <img src="https://img.shields.io/badge/Google API-FF0000?style=for-the-badge&logo=YouTube&logoColor=black">
</p>
<br />

<p align="center">
  Blockchain
  <br />
  <img src="https://img.shields.io/badge/ipfs-65C2CB?style=for-the-badge&logo=ipfs&logoColor=white">
  <img src="https://img.shields.io/badge/solidity-363636?style=for-the-badge&logo=solidity&logoColor=black">
  <img src="https://img.shields.io/badge/ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=black">
</p>
<br />

<p align="center">
  Collaboration Tool
  <br />
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
  <br />
  <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
</p>
<br />
