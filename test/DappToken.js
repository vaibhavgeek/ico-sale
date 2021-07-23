var DappToken = artifacts.require("./DappToken.sol")

contract('DappToken', function(accounts) {
    it("sets the total supply upon deployment", function(){
        return DappToken.deployed().then(async function (instance){
            tokenInstance = instance;
            return await tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 1000000, 'sets tht total supply to 1000000 (1 million)');
        })
    });
})