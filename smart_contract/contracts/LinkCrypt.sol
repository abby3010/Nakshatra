// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract LinkCrypt {
    uint256 transactionCounter;

    event Transfer(
        address sender,
        string link,
        string originator,
        string source,
        string message,
        uint256 timestamp,
        string keyword,
        string slug
    );

    struct TransferStruct {
        address sender;
        string link;
        string originator;
        string source;
        string message;
        uint256 timestamp;
        string keyword;
        string slug;
    }

    TransferStruct[] transactions;

    function addToBlockchain(
        string memory link,
        string memory originator,
        string memory source,
        string memory message,
        string memory keyword,
        string memory slug
    ) public {
        transactionCounter += 1;
        transactions.push(TransferStruct(msg.sender, link, originator, source, message, block.timestamp, keyword, slug));

        emit Transfer(msg.sender, link, originator, source, message, block.timestamp, keyword, slug);

    }

    
    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }
    
    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }

}
