# GraphQLNodeServer

setup:
1.  npm install
2.  Get mongoDB database set up, and update dbUrl variable with it in index.js
3.  go to localhost:3000/graphql and enter in graphQL queries to test it.
4.  Currently only has insert and request implemented, and request will return all data rows, since code for exporting data 
    to csv / zip not yet written

example queries:
insert:
mutation {
 insertStudyData(data: {sessionId:"123", studyId:"444", datarows: [{data:[{id:"first", value:"second"}]}]})
}

request: 
query{
  getStudyData(studyId: "String!", startDate: "String", endDate: "String")
}
