var express = require('express')
var app = express()
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var Promise = require('promise');
// Connection URL
var dbUrl = 'mongodb://localhost:27017/myproject';
var mongoose = require('mongoose');
mongoose.connect(dbUrl);
var database = mongoose.connection;
var datasetSchema = mongoose.Schema({
    sessionId: String,
	studyId: String,
	datarows: [{data:[{id: String, value: String}]}]
});
var Dataset =mongoose.model('Dataset', datasetSchema);
var graphqlSchema = buildSchema(`
	type Query {
  	  	getStudyData(studyId: String!, startDate: String, endDate: String ): String  
    }
    type Mutation {
   	 insertStudyData(data: Dataset!) :String
    }
      input Dataset{
          datarows: [DataRow]!  
    	  #below are variables that are required for all data posts.  More may end up needed
     	  sessionId: String!  #some unique ID for this session
    	  studyId:String!   #some unique ID for the study
   	   	  #server handles date/time to be recorded
    }
    input DataRow{
    data:[ValuePair]!  
    }
    input ValuePair{
    id: String!
    value: String
    }`);
var root = {
  insertStudyData: function ({data}) {
	  var dataset = new Dataset(data);
	  dataset.save(function (err, dataset) {
	    if (err) return console.error(err);
	  });
    return "saved";
  },
  getStudyData: function (studyId,startDate,endDate) { 
	  var output=[]; 
	  return new Promise(function (fulfill, reject){
		  Dataset.find(function (err, results) {
		    if (err) reject(err);
			output.push(JSON.stringify(results));
			fulfill(output);
		  });

	    });
	
	return output;
  }
};

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: root,
  graphiql: true,
}));

app.get('/', function (req, res) {
  res.send('Go to /graphql to run queries')
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
