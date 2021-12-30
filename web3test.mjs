import Web3 from "web3";

var web3 = new Web3('http://127.0.0.1:7545');

// lists all accounts from ganache local blockchain
web3.eth.getAccounts(console.log);

// compiled solidity source code using https://remix.ethereum.org
var code = "603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";

// 10000000000000000000 === 10 eth
// 10(000000000000000000) === 10 eth (18 decimals)
// send 10 eth using a promise
web3.eth.sendTransaction({
    from: '0x7c5Ce17E94Fb61F12344343D624d87Ef77D8b3C1',
    to: '0xBb378E9B0fd6D03Ed0A4cf1916C8E4A7280C6087',
    value: '10000000000000000000'
})
    .then(function (receipt) {
    console.log(receipt)
});


// contract usage

var Contract = require('web3-eth-contract');

// set provider for all later instances to use
Contract.setProvider('ws://localhost:8546');

var contract = new Contract(jsonInterface, address);

contract.methods.somFunc().send({ from: ....})
    .on('receipt', function () {
    ...
});