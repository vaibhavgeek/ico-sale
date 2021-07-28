var TokenSale = artifacts.require("./TokenSale.sol");
var DappToken = artifacts.require("./DappToken.sol");

contract('TokenSale', function(accounts){
    var tokenSaleInstance;
    var tokenPrice = 1000000000000000;
    var buyer = accounts[1];
    var admin = accounts[0];
    var tokensAvailable = 750000;
    var numberOfTokens;
    it("initializes with correct values", function(){
        return TokenSale.deployed().then(function(instance){
            tokenSaleInstance = instance;
            return tokenSaleInstance.address; 
        }).then(async function(address){
             console.log(address);
             assert.notEqual(address, 0x0, "has proper contract address");
             return await tokenSaleInstance.tokenContract();
         }).then(async function(address){
             assert.notEqual(address, 0x0, "has token conrtact address");
             return await tokenSaleInstance.tokenPrice();
         }).then(function(price){
             assert.equal(price, tokenPrice, "token price is correct")
         });
    });

     it("facilates token function", function(){
         return DappToken.deployed().then(function(instance){
            tokeInstance = instance;
            return TokenSale.deployed();
         }).then(function(instance){
             tokenSaleInstance = instance;
             return tokeInstance.transfer(TokenSale.address, tokensAvailable, {from: admin});
         }).then(function(reciept){
             numberOfTokens = 10;
             var value = numberOfTokens * tokenPrice;
             return tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: value});
         }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the transfer amount');
            return tokenSaleInstance.tokensSold();
         }).then(function(amount){
             //console.log(amount.toNumber());
             assert.equal(amount.toNumber(), numberOfTokens, "increments number of tokens sold");
             return tokeInstance.balanceOf(buyer);
         }).then(function(amount){
            //console.log(amount.toNumber());
            assert.equal(amount.toNumber(), numberOfTokens , "Equal Validation for balance");
             return tokeInstance.balanceOf(tokenSaleInstance.address);
         }).then(function(amount){
            //console.log(amount.toNumber());
             assert.equal(amount.toNumber(), tokensAvailable - numberOfTokens, "Equal Validation for balance");
             return tokenSaleInstance.buyTokens(numberOfTokens,{from: buyer, value: 1});
         }).then(assert.fail).catch(function(error){
             ///console.log(error.message);
            assert(error.message.indexOf('revert') >= 0 , "msg.value must equal number of tokens in wei");
            return tokenSaleInstance.buyTokens(800000, {from: buyer, value: numberOfTokens * tokenPrice});
         }).then(assert.fail).catch(function(error){
             //console.log(error.message);
             assert(error.message.indexOf('revert') >=0 , "kismat se zyada aur waqt se pehle kuch nahi milta");
         });
     });

     it("ends token sale", function(){
        return DappToken.deployed().then(function(instance){
            tokeInstance = instance;
            return TokenSale.deployed();
         }).then(function(instance){
             tokenSaleInstance = instance;
             return tokenSaleInstance.endSale({from: buyer});
         }).then(assert.fail).catch(function(error){
             console.log(error.message);
             assert(error.message.indexOf('revert') >= 0, "end sale cannot be called from buyer check");
             return tokenSaleInstance.endSale({from: admin});
        }).then(function(receipt) {
            return tokeInstance.balanceOf(admin);
        }).then(async function(balance) {
            //console.log(balance.toNumber());
            assert.equal(balance.toNumber(), 999990, 'returns all unsold dapp tokens to admin');
           // Check that the contract has no balance
            balance = await web3.eth.getBalance(tokenSaleInstance.address);
            //console.log(balance);
            assert.equal(balance, 0);
       });
     })
})