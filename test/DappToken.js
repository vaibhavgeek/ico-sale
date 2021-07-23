var DappToken = artifacts.require("./DappToken.sol")

contract('DappToken', function(accounts) {
    var tokenInstance;

    it("initializes contract with correct values", function(){
            return DappToken.deployed().then(async function (instance){
            tokenInstance = instance;
            return await tokenInstance.name();
        }).then(function(name){
            assert.equal(name, "VAIBHAV", "has the correct name");
            return tokenInstance.symbol();
        }).then(function(symbol){
            assert.equal(symbol, "VAI", "has the correct symbol");
            return tokenInstance.standard();
        }).then(function(standard){
            assert.equal(standard, "V1.0", "correct standard");
        });
    });

    it("sets the total supply upon deployment", function(){
        return DappToken.deployed().then(async function (instance){
            tokenInstance = instance;
            return await tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 1000000, 'sets tht total supply to 1000000 (1 million)');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance){
                assert.equal(adminBalance.toNumber(), 1000000, "admin check initial supply");
        })
    });

    it("transfer token ownership", function(){
        return DappToken.deployed().then(async function (instance){
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 99999999999999999999999)
        }).then(assert.fail).catch(function(error){
            // console.log(error.message);
            assert(error.message.indexOf('overflow') != -1 , "error message must contain revert");
            return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0]});
        }).then(function(successs){
            assert(successs, true, "it returns true");
            return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balanceTo){
            assert.equal(balanceTo.toNumber(), 250000, 'adds the amount to the recieving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balanceFrom){
            assert.equal(balanceFrom.toNumber(), 750000, 'deduct from account');
        }); 
    })
})