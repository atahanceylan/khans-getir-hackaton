var MongoClient = require('mongodb').MongoClient;

var ObjectId = require('mongodb').ObjectID;

var url = "mongodb://dbUser:dbPassword@ds155428.mlab.com:55428/getir-bitaksi-hackathon";

function getData(){
MongoClient.connect(url, function(err, db) {

                if (err) throw err;

                var dbo = db.db("getir-bitaksi-hackathon");

                var result = dbo.collection("records").aggregate([{

                               $project:{

                                               key:1,

                                               createdAt:1,

                                               counts:1,

                                               countsTotal:1,

                                               countsTotal:{$sum:"$counts"}

                                              

                               }

                },

                {

                               $match:

                               {

                                               createdAt:{$gte:new Date("2016-01-26"),$lte:new Date("2016-07-07")},

                                               countsTotal:{$gte:2700,$lte:3000}

                               }

                }

                ],function(err,result){

                               if (err){throw err;}

                               result.limit(10).toArray(function(err, result) {

                                               if (err) throw err;            

                                               result.forEach(function(entry) {

                                                               console.log("Key : "+entry.key);

                                                               console.log("Created At : "+entry.createdAt);

                                                               entry.counts.sort().forEach(function(c){

                                                                               console.log("\t"+c);

                                                               });

                                                               console.log("Total : "+entry.countsTotal);

                                                               console.log("----------------");

                                               });

                               });

                });

    db.close();                                                    

});
}
getData();
/*
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month;
  res.end(txt);
}).listen(8080);
*/
