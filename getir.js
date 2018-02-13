var MongoClient = require('mongodb').MongoClient;

var ObjectId = require('mongodb').ObjectID;

var url = "mongodb://dbUser:dbPassword@ds155428.mlab.com:55428/getir-bitaksi-hackathon";


function getData(startDate,endDate,minCount,maxCount){
var resultante = "";
MongoClient.connect(url, function(err, db) {

                if (err) throw err;
				
                var dbo = db.db("getir-bitaksi-hackathon");

                var result = dbo.collection("records").aggregate([{

                               $project:{

                                               key:1,

                                               createdAt:1,

                                               countsTotal:1,

                                               countsTotal:{$sum:"$counts"}

                                              

                               }

                },

                {

                               $match:

                               {

                                               createdAt:{$gte:new Date(startDate),$lte:new Date(endDate)},

                                               countsTotal:{$gte:minCount,$lte:maxCount}

                               }

                }

                ],function(err,result){

                               if (err){throw err;}
								
                               result.limit(10).toArray(function(err, result) {
											   	
                                               if (err) throw err;    
											 resultOfMongo(result);												   
											   
                                               

                               });

                });

	
    db.close();                                                    

});

}



var http = require('http');
var urlOfWeb = require('url');
function resultOfMongo(resultText)
{
	return resultText;
}
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var q = urlOfWeb.parse(req.url, true).query;
  var txt = q.startDate + " " + q.endDate + " " + q.minCount + " " + q.maxCount;
  var result = getData(String(q.startDate),String(q.endDate),q.minCount,q.maxCount)
  //var result = getData("2016-01-26","2017-02-02",2700,3000);
  
  res.end(txt);
  res.end(result);
}).listen(1907);

