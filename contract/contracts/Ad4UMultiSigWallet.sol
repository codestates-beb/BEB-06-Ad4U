// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


contract Ad4UMultiSigWallet {
    event Deposit(address indexed sender, uint amount, uint balance);
    event SubmitTransaction(
        address indexed owner,
        uint indexed txIndex,
        address indexed to,
        uint value,
        string data
    );
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint indexed txIndex);
    event Response(bool success, bytes data);

    address[] public owners;
    address public ownerCandidate;
    uint signedCount = 0;
    mapping(address => bool) public isOwner;
    uint public numConfirmationsRequired;


    struct Transaction {
        address to;
        uint value;
        string data; // tokenURI가 담길 것이기 때문에 string으로
        bool executed;
        uint numConfirmations;
        bool broken; // 파기 여부
    }

    // mapping from tx index => owner => bool
    mapping(uint => mapping(address => bool)) public isConfirmed;

    Transaction[] public transactions;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    modifier txExists(uint _txIndex) {
        require(_txIndex < transactions.length, "tx does not exist");
        _;
    }

    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "tx already executed");
        _;
    }

    modifier notConfirmed(uint _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "tx already confirmed");
        _;
    }

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

    // 광고주만 계약 내용을 등록할 수 있음
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
    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }


    function submitTransaction(
        address _to,
        uint _value,
        string memory _data // metadata URL(tokenURI) => metadata는 암호화된 상태로 올라감
    ) 
    public 
    payable
    onlyClient  // 광고주만 계약 내용을 등록할 수 있음
    signedCountCheck // 광고주, 유튜버 모두 Sign한 상태여야 함
    returns (uint)
    {
        require(_to == owners[1], "Invaild receiver address"); // _to는 유튜버 주소여야만 함
        uint txIndex = transactions.length;

        // 이때, 단위는 wei
        require(msg.value >= _value, "Not Enough value"); // 예치금이 송금액보다 높아야 한다.

        //SBT Minting : call
        address sbtContract = 0x7DD86621E0aFD283A5546a0039fdBF9aC2FCA65B;
        (bool success, bytes memory data) = address(sbtContract).call(
            abi.encodeWithSignature("mintSBT(address,string)", _to, _data)
        );

        require(success, "Tx Invaild");

        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data, // SBT tokenURI가 들어가야 함
                executed: false,
                numConfirmations: 0,
                broken: false
            })
        );
        emit Response(success, data);
        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
        return txIndex;
    }

    function confirmTransaction(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
        notConfirmed(_txIndex)
        notBroken(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;

        if(transaction.numConfirmations == 2) {
            executeTransaction(_txIndex);
        }

        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    function executeTransaction(uint _txIndex)
        internal
        txExists(_txIndex)
        notExecuted(_txIndex)
        notBroken(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "cannot execute tx"
        );

        transaction.executed = true;

        //원래 계약 내용 대로, 트랜잭션 발생
        (bool success, ) = transaction.to.call{value: transaction.value}(
            abi.encodeWithSignature(transaction.data)
        );
        require(success, "tx failed");

        //계약 내용을 수행하고 남은 잔금이 있다면 광고주에게
        if(address(this).balance > 0) {
            address payable client = payable(owners[0]);
            bool sent = client.send(address(this).balance);
            require(sent, "Failed to send Ether");
        }

        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    function revokeConfirmation(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
        notBroken(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        //계약 파기로 간주, 예치된 금액을 광고주의 주소로 다시 보냄
        address payable client = payable(owners[0]);
        bool sent = client.send(address(this).balance);
        require(sent, "Failed to send Ether");

        transaction.broken = true; // 파기 처리

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
        signedCount += 1; // signedCount 증가
        
    }


    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function getTransactionCount() public view returns (uint) {
        return transactions.length;
    }

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
