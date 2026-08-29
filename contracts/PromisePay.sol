// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PromisePay
 * @dev Programmable commitment protocol for Monad Testnet.
 * Allows users to lock native MON behind a promise condition and release funds when verified.
 */
contract PromisePay {
    // ==========================================
    // ENUMS & STRUCTS
    // ==========================================

    enum PromiseStatus {
        LOCKED,     // 0: Funds deposited & locked in contract
        VERIFIED,   // 1: Condition verified, claimable by recipient
        CLAIMED,    // 2: Funds claimed by recipient
        CANCELLED   // 3: Refunded to sender
    }

    struct Promise {
        uint256 id;
        address payable sender;
        address payable recipient;
        uint256 amount;
        string condition;
        PromiseStatus status;
        uint256 createdAt;
        uint256 verifiedAt;
        uint256 claimedAt;
    }

    // ==========================================
    // STATE VARIABLES
    // ==========================================

    uint256 public promiseCount;
    address public verifier;

    // Mapping from Promise ID -> Promise struct
    mapping(uint256 => Promise) public promises;

    // Mapping from User address -> List of Promise IDs
    mapping(address => uint256[]) private _userPromiseIds;

    // Reentrancy lock
    uint256 private _lockedState = 1;

    // ==========================================
    // EVENTS
    // ==========================================

    event PromiseCreated(
        uint256 indexed id,
        address indexed sender,
        address indexed recipient,
        uint256 amount,
        string condition
    );

    event PromiseVerified(
        uint256 indexed id,
        address indexed verifier
    );

    event PromiseClaimed(
        uint256 indexed id,
        address indexed recipient,
        uint256 amount
    );

    event PromiseCancelled(
        uint256 indexed id,
        address indexed sender,
        uint256 amount
    );

    // ==========================================
    // MODIFIERS
    // ==========================================

    modifier nonReentrant() {
        require(_lockedState == 1, "REENTRANCY_GUARD");
        _lockedState = 2;
        _;
        _lockedState = 1;
    }

    modifier onlyVerifierOrSender(uint256 _promiseId) {
        Promise memory p = promises[_promiseId];
        require(
            msg.sender == verifier || msg.sender == p.sender,
            "NOT_AUTHORIZED_VERIFIER"
        );
        _;
    }

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    constructor() {
        verifier = msg.sender;
    }

    // ==========================================
    // EXTERNAL FUNCTIONS
    // ==========================================

    /**
     * @notice Create a new promise and lock native MON tokens.
     * @param _recipient Target address to receive funds upon condition fulfillment.
     * @param _condition String describing the promise condition (e.g., "Graduation").
     * @return promiseId Unique ID of the created promise.
     */
    function createPromise(
        address payable _recipient,
        string calldata _condition
    ) external payable returns (uint256 promiseId) {
        require(msg.value > 0, "AMOUNT_MUST_BE_GREATER_THAN_ZERO");
        require(_recipient != address(0), "INVALID_RECIPIENT_ADDRESS");
        require(bytes(_condition).length > 0, "CONDITION_REQUIRED");

        promiseCount++;
        promiseId = promiseCount;

        promises[promiseId] = Promise({
            id: promiseId,
            sender: payable(msg.sender),
            recipient: _recipient,
            amount: msg.value,
            condition: _condition,
            status: PromiseStatus.LOCKED,
            createdAt: block.timestamp,
            verifiedAt: 0,
            claimedAt: 0
        });

        _userPromiseIds[msg.sender].push(promiseId);
        if (_recipient != msg.sender) {
            _userPromiseIds[_recipient].push(promiseId);
        }

        emit PromiseCreated(promiseId, msg.sender, _recipient, msg.value, _condition);
    }

    /**
     * @notice Verify a promise condition. Only the verifier or sender can verify.
     * @param _promiseId ID of the promise to verify.
     */
    function verifyPromise(uint256 _promiseId) external onlyVerifierOrSender(_promiseId) {
        Promise storage p = promises[_promiseId];
        require(p.id != 0, "PROMISE_DOES_NOT_EXIST");
        require(p.status == PromiseStatus.LOCKED, "PROMISE_NOT_LOCKED");

        p.status = PromiseStatus.VERIFIED;
        p.verifiedAt = block.timestamp;

        emit PromiseVerified(_promiseId, msg.sender);
    }

    /**
     * @notice Claim locked MON funds. Only the designated recipient can call this.
     * @param _promiseId ID of the promise to claim.
     */
    function claim(uint256 _promiseId) external nonReentrant {
        Promise storage p = promises[_promiseId];
        require(p.id != 0, "PROMISE_DOES_NOT_EXIST");
        require(msg.sender == p.recipient, "ONLY_RECIPIENT_CAN_CLAIM");
        require(p.status == PromiseStatus.VERIFIED, "PROMISE_NOT_VERIFIED");

        uint256 claimAmount = p.amount;
        
        // Checks-Effects-Interactions (CEI) Pattern
        p.status = PromiseStatus.CLAIMED;
        p.claimedAt = block.timestamp;

        // Native MON Transfer
        (bool success, ) = p.recipient.call{value: claimAmount}("");
        require(success, "NATIVE_MON_TRANSFER_FAILED");

        emit PromiseClaimed(_promiseId, msg.sender, claimAmount);
    }

    /**
     * @notice Cancel promise and refund locked MON back to sender. Only sender can cancel locked promises.
     * @param _promiseId ID of the promise to cancel.
     */
    function cancelPromise(uint256 _promiseId) external nonReentrant {
        Promise storage p = promises[_promiseId];
        require(p.id != 0, "PROMISE_DOES_NOT_EXIST");
        require(msg.sender == p.sender, "ONLY_SENDER_CAN_CANCEL");
        require(p.status == PromiseStatus.LOCKED, "PROMISE_CANNOT_BE_CANCELLED");

        uint256 refundAmount = p.amount;

        // CEI Pattern
        p.status = PromiseStatus.CANCELLED;

        // Refund Transfer
        (bool success, ) = p.sender.call{value: refundAmount}("");
        require(success, "REFUND_TRANSFER_FAILED");

        emit PromiseCancelled(_promiseId, msg.sender, refundAmount);
    }

    // ==========================================
    // VIEW FUNCTIONS
    // ==========================================

    /**
     * @notice Fetch details for a specific promise.
     * @param _promiseId ID of the promise.
     */
    function getPromise(uint256 _promiseId) external view returns (Promise memory) {
        require(_promiseId > 0 && _promiseId <= promiseCount, "INVALID_PROMISE_ID");
        return promises[_promiseId];
    }

    /**
     * @notice Fetch all promises associated with a user (as sender or recipient).
     * @param _user Address of the user.
     */
    function getUserPromises(address _user) external view returns (Promise[] memory) {
        uint256[] memory ids = _userPromiseIds[_user];
        Promise[] memory result = new Promise[](ids.length);

        for (uint256 i = 0; i < ids.length; i++) {
            result[i] = promises[ids[i]];
        }

        return result;
    }

    /**
     * @notice Get total number of promises created.
     */
    function getPromiseCount() external view returns (uint256) {
        return promiseCount;
    }
}
