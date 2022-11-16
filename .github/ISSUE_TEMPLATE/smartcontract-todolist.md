---
name: SmartContract ToDoList
about: SmartContract ToDoList
title: ''
labels: ''
assignees: ''

---

task 1) Truffle

- [ ]  contract 배포
    - [ ]  ABI, Address 파일 형태로 저장

task 2) Multi-sig Wallet Contract

- [ ]  1. 계약 시작 ⇒ Multi-Sig Wallet 배포(msg.sender : 관리자, owner : 광고주, 유튜버, confirmCount = 2)
- [ ]  2. 배포된 Multi-Sig Wallet에 유튜버 서명(msg.sender : 유튜버) : SupplierSign 함수
- [ ]  3. 계약 등록(msg.sender : 관리자, txData 작성, 유튜버 address도 인자 포함(NFT 발행에 사용)) : submitTransaction 함수
    - [ ]  이때, 유튜버, 관리자 모두 Signed 상태여야 함
    - [ ]  계약 등록과 동시에 SBT 컨트랙 접근 및 발행(msg.sender : multi-sig contract, recipient : 유튜버 주소)
- [ ]  4-1. 계약 정상 진행시
    - [ ]  유튜버, 광고주 모두 계약에 대한 동의(msg.sender : 개개인, txIndex : 0) : ConfirmTransaction 함수
    - [ ]  동의가 완료되면, 유튜버나 광고주가 등록했던 계약을 실행시키며 계약 종료(msg.sender : 유튜버나 광고주, txIndex : 0) : ExecuteTransaction
        - [ ]  이때 ConfirmCount = 2
- [ ]  4-2. 한 명이 악의적
    - [ ]  유튜버가 악의적인 경우 : 광고주 confirm 취소(msg.sender : 광고주, txIndex: 0) : RevokeTranscation ⇒ 유튜버는 돈을 받지 못함 + 계약 내용이 담긴 NFT기록과 서명 기록이 남아있기 때문에 증거 명확
    - [ ]  광고주가 악의적인 경우 : 유튜버 confirm 취소(msg.sender : 유튜버, txIndex: 0) : RevokeTranscation ⇒ 광고주는 SBT민팅, contract배포등의 비용을 지불 + 광고주는 계약 내용이 담긴 NFT기록과 서명 기록이 남아있기 때문에 증거 명확

task 3) SBT Minting Contract

- [ ]  multi-sig contract통해서 발행
- [ ]  유튜버 주소로 민팅
