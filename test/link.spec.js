const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "http://localhost:8888";

describe("ShortLink API test",function(){
  
  it("Should return status code 200",function(done){
    request.get(
      {
        url : urlBase + "/test"
      },
      function(error, response, body){

        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        expect(response.statusCode).to.equal(200);

        done(); 
      }
    );
  });
});