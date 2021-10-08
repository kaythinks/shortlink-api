const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "http://localhost:8888";

describe("ShortLink API test",function(){
  
  	it("Should  call the test endpoint",function(done){
    request.get(
      {
        url : urlBase + "/test"
      },
      (error, response, body) => {

        let _body = {};
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

  	it("Should call the base endpoint",function(done){
    request.get(
      {
        url : urlBase 
      },
      (error, response, body) => {

        let _body = {};
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

  	it("Should assert a route is invalid",function(done){
    request.get(
      {
        url : urlBase + "/dfddggdg"
      },
      (error, response, body) => {

        let _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        expect(response.statusCode).to.equal(404);

        done(); 
      }
    );
  	});
});