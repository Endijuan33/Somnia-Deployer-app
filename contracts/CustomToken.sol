// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomToken is ERC20 {
    string private _customName;
    string private _customSymbol;
    uint8 private _customDecimals;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 totalSupply_
    ) ERC20(name_, symbol_) {
        owner = msg.sender;
        _customName = name_;
        _customSymbol = symbol_;
        _customDecimals = decimals_;
        _mint(address(this), totalSupply_);
    }

    function name() public view override returns (string memory) {
        return _customName;
    }

    function symbol() public view override returns (string memory) {
        return _customSymbol;
    }

    function decimals() public view override returns (uint8) {
        return _customDecimals;
    }

    function sendNative(address payable recipient, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        (bool sent, ) = recipient.call{value: amount}("");
        require(sent, "Transfer failed");
    }

    function sendToken(address recipient, uint256 amount) external onlyOwner {
        _transfer(address(this), recipient, amount);
    }

    receive() external payable {}
}
