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
})