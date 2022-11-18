// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

//다중 서명 컨트랙 : Client와 Supplier만 사용할 수 있는 Wallet
contract Ad4UMultiSigWallet {
    event Deposit(address indexed sender, uint amount, uint balance); // 송금 이벤트
    event SubmitTransaction( 
        address indexed owner,
        uint indexed txIndex,
        address indexed to,
        uint value,
        string data
    ); // 계약을 성공적으로 완료하면(2 confirm시) 발생시킬 트랜잭션 등록 이벤트
    event ConfirmTransaction(address indexed owner, uint indexed txIndex); // confirm 이벤트
    event RevokeConfirmation(address indexed owner, uint indexed txIndex); // revoke 이벤트
    event ExecuteTransaction(address indexed owner, uint indexed txIndex); // Execute 이벤트 : submitTransaction에서 등록한 트랜잭션을 2confirm이 되면, 이 때 자동 수행 
    event Response(bool success, bytes data); // minting에 대한 이벤트

    address[] public owners; // owner 배열, => Client와 Suplier 주소가 들어감
    address public ownerCandidate; // 해당 wallet 배포시 Client는 계약 대상을 지정하는데, 이게 계약 대상자
    uint signedCount = 0; // sign횟수 : sign이 2번(Client, Supplier 모두 Sign)되어야 submitTransaction 함수 실행 가능
    mapping(address => bool) public isOwner; // owner인지 true, false
    uint public numConfirmationsRequired; // 등록된 트랜잭션을 실행시키기 위한 confirm 횟수(여기서는 Client와 Supplier 두 명만 있기 때문에 2로 설정)


    // 계약을 성공적으로 완료했을 때, 실행시킬 Transaction 데이터 구조체
    struct Transaction {
        address to; // 누구에게 
        uint value; // 얼마를 
        string data; // 계약서에 대한 tokenURI
        bool executed; // 실행되었는지 : true, false
        uint numConfirmations; // 해당 트랜잭션에 대한 confirm 횟수 => 2가 되면 자동 실행(ExecuteTransaction)
        bool broken; // 파기 여부 => revoke가 하나라도 발생할 경우 파기 처리
    }

    // mapping from tx index => owner => bool
    mapping(uint => mapping(address => bool)) public isConfirmed; // 어떤 txIndex에 대해 누가 confirm 했는지 true, false

    Transaction[] public transactions; // 트랜잭션 배열(수정이 없다면 index : 0만 쓰고, 수정이 있다면 해당 배열에 다시 올리고 index만 바꿔주면 그 트랜잭션 사용)

    // owner인지
    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    //해당 txIndex가 존재하는지 : 유효한 트랜잭션인지 확인
    modifier txExists(uint _txIndex) {
        require(_txIndex < transactions.length, "tx does not exist");
        _;
    }

    //해당 트랜잭션이 이미 실행되었는지 : 이미 실행된 트랜잭션에 confirm이나, revoke 등을 막음
    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "tx already executed");
        _;
    }

    //해당 트랜잭션에 대해 msg.sender가 confirm한 상태인지 : confirm을 이미 실행했는데, 또 실행 못하도록 막음
    modifier notConfirmed(uint _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "tx already confirmed");
        _;
    }

    // 해당 트랜잭션이 파기된 상태인지 : 파기된 트랜잭션에 대해 confirm이나 revoke, execute등을 막음
    modifier notBroken(uint _txIndex) {
        require(!transactions[_txIndex].broken, "tx already broken");
        _;
    }

    // 유튜버 서명시 관리자가 등록한 주소여야 함
    modifier onlyOwnerCandidate() {
        require(msg.sender == ownerCandidate, "You are not a registered contractor");
        _;
    }

    // 광고주만 계약 내용을 등록할 수 있음
    modifier onlyClient() {
        require(msg.sender == owners[0], "This feature is available only for client");
        _;
    }

    // 광고주, 유튜버 모두 Sign을 했을 시에만 계약 정상 진행시 발생시킬 트랜잭션을 등록 가능
    modifier signedCountCheck() {
        require(signedCount == 2, "Need the sign of the contractee");
        _;
    }

    //배포시 msg.sender : 광고주
    //SupplierSign에 다른 사람이 Sign할수도 있으니, 미리 입력을 해놓고 주소가 맞을 경우 owner에 등록
    constructor(address supplier) {
        //배포자는 우선 owner에 등록(광고주가 wallet에 대한 권한 가짐)
        address owner = address(msg.sender);
        isOwner[owner] = true;
        owners.push(owner);

        //광고주가 계약 대상자를 자기 자신으로 설정할 수 없음
        require(owner != supplier, "You cannot set yourself as a contractee");

        // 유튜버의 주소를 owner 후보군에 올림
        ownerCandidate = supplier;

        //numConfirmationRequired는 광고주와 유튜버이기 때문에 2로 고정
        numConfirmationsRequired = 2;

        // signedCount 증가
        signedCount += 1;
    }

    //anyone can deposit funds into the wallet and emit an event called depositfunds
    // 해당 컨트랙이 ETH를 보유할 수 있도록 함
    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    // 계약 등록 : 여기서 계약 정상 진행시 발생시킬 트랜잭션 등록 및 SBT 발행
    function submitTransaction(
        address _to, // 누구에게
        uint _value, // 얼마를
        string memory _data // metadata URL(tokenURI) : 계약서 내용이 들어감
    ) 
    public 
    payable // 여기서 Client는 미리 _value만큼 해당 contract에 예치를 진행하기 때문애 payable로 eth를 받음
    onlyClient  // 광고주만 계약 내용을 등록할 수 있음
    signedCountCheck // 광고주, 유튜버 모두 Sign한 상태여야 함
    returns (uint)
    {
        require(_to == owners[1], "Invaild receiver address"); // _to는 유튜버 주소여야만 함 : 계약 정상 진행 시 다른 사람에게 보낼 수 있음으로
        uint txIndex = transactions.length; // txIndex 설정 

        // 이때, 단위는 wei
        require(msg.value >= _value, "Not Enough value"); // 예치금이 송금액보다 높아야 한다.

        //SBT Minting : call
        address sbtContract = 0x7DD86621E0aFD283A5546a0039fdBF9aC2FCA65B; // sbt contract address
        (bool success, bytes memory data) = address(sbtContract).call(
            abi.encodeWithSignature("mintSBT(address,string)", _to, _data) // mintSBT 함수 실행
        );

        require(success, "Tx Invaild"); // success 검사

        // 검사 후 트랜잭션 배열에 등록
        transactions.push(
            Transaction({
                to: _to, // 누구에게
                value: _value, // 얼마를 
                data: _data, // SBT tokenURI가 들어가야 함
                executed: false, // 아직 실행 안됨
                numConfirmations: 0, // confirm 0 시작
                broken: false// 아직 파기 안됨
            })
        );
        emit Response(success, data); 
        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
        return txIndex; // 등록한 트랜잭션의 인덱스 반환
    }

    // confirm : 계약이 성공적인 경우, Client, Supplier 각자 체크
    function confirmTransaction(uint _txIndex)
        public
        onlyOwner // owner여야 함
        txExists(_txIndex) // confirm할 트랜잭션이 유효해야 함
        notExecuted(_txIndex) // confirm할 트랜잭션이 실행되지 않은 상태여야 함
        notConfirmed(_txIndex) // 이미 msg.sender에 의해 confirm된 트랜잭션이 아니여야 함
        notBroken(_txIndex) // confirm할 트랜잭션이 파기되지 않은 상태여야 함
    {
        Transaction storage transaction = transactions[_txIndex]; // 트랜잭션 정보 가져오기(BY txIndex)
        transaction.numConfirmations += 1; // 해당 트랜잭션에 대한 confirm count 증가
        isConfirmed[_txIndex][msg.sender] = true; // 누가 어떤 트랜잭션에 confirm했는지 저장

        if(transaction.numConfirmations == 2) { // 만약 confirm이 2회, 즉 Client와 Supplier 모두 Confirm했다면 자동으로 트랜잭션 Execute
            executeTransaction(_txIndex); // 해당 txIndex의 트랜잭션 실행
        }

        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    // 트랜잭션 실행
    function executeTransaction(uint _txIndex)
        internal // 외부적으로 실행 불가, confirm 횟수가 2이면 내부적으로 자동 실행
        txExists(_txIndex) // 실행할 트랜잭션이 존재해야 함
        notExecuted(_txIndex) // 이미 실행된 트랜잭션이 아니여야 함
        notBroken(_txIndex) // 파기된 트랜잭션이 아니여야 함
    {
        Transaction storage transaction = transactions[_txIndex]; // 트랜잭션 정보 가져오기

        // confirm 횟수 검사(이미 검사해서 넘겨주기 때문에 삭제해도 상관없)
        require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "cannot execute tx"
        );

        transaction.executed = true; // 해당 트랜잭션이 실행된 상태임을 저장

        //원래 계약 내용 대로, 트랜잭션 발생
        (bool success, ) = transaction.to.call{value: transaction.value}(
            abi.encodeWithSignature(transaction.data)
        );
        require(success, "tx failed"); // 성공적으로 트랜잭션이 발생했는지 검사

        //계약 내용을 수행하고 남은 잔금이 있다면 광고주에게
        if(address(this).balance > 0) {
            address payable client = payable(owners[0]); // Client Address 가져오기
            bool sent = client.send(address(this).balance); // 잔금을 Client에게 
            require(sent, "Failed to send Ether"); // 성공적으로 잔금을 전송했는지 검사
        }

        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    // 계약 파기
    function revokeConfirmation(uint _txIndex)
        public
        onlyOwner // owner만 실행 가능
        txExists(_txIndex) // 파기시킬 트랜잭션이 유효해야 함
        notExecuted(_txIndex) // 파기시킬 트랜잭션이 이미 실행된 트랜잭션이 아니여야 함
        notBroken(_txIndex) // 파기시킬 트랜잭션이 이미 파기된 트랜잭션이 아니여야 함
    {
        Transaction storage transaction = transactions[_txIndex]; // 트랜잭션 정보 가져오기

        require(isConfirmed[_txIndex][msg.sender], "tx not confirmed"); // 파기는 confirm을 되돌리는 것이기 때문에 confirm된 상태여야 함

        transaction.numConfirmations -= 1; // 해당 트랜잭션에 대한 confirm 횟수 감소
        isConfirmed[_txIndex][msg.sender] = false; // 누가 어떤 트랜잭션에 confirm했는지 업데이트(파기이므로 false로)

        //계약 파기로 간주, 예치된 금액을 광고주의 주소로 다시 보냄
        address payable client = payable(owners[0]); // Client Address 가져오기
        bool sent = client.send(address(this).balance); // 잔금 보내기
        require(sent, "Failed to send Ether"); // 잔금이 잘 보내졌는지 확인

        transaction.broken = true; // 해당 트랜잭션 파기 처리

        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    //유튜버 서명 
    function SupplierSign()
     public 
     onlyOwnerCandidate // 유튜버 서명시 광고주가 등록한 주소여야 함
    {
        // owner 등록
        owners.push(ownerCandidate); 
        isOwner[ownerCandidate] = true;

        delete ownerCandidate; // 후보군 삭제
        signedCount += 1; // signedCount 증가 => Client가 배포시 +1 SupplierSign시 +1
        
    }


    // 해당 wallet contract의 owner 주소 가져오기
    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    // 해당 wallet에 몇개의 트랜잭션이 등록되었는지 == submitTransaction을 통해 트랜잭션을 몇 번 생성했는지
    function getTransactionCount() public view returns (uint) {
        return transactions.length;
    }

    // 트랜잭션 배열에서 해당 인덱스에 해당하는 트랜잭션 정보 전부 반환
    function getTransaction(uint _txIndex)
        public
        view
        returns (
            address to,
            uint value,
            string memory data,
            bool executed,
            uint numConfirmations
        )
    {
        Transaction storage transaction = transactions[_txIndex];

        return (
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.numConfirmations
        );
    }
}
