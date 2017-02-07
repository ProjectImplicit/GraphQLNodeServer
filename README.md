# GraphQLNodeServer

setup: <br/>
1.  npm install<br/>
2.  Get mongoDB database set up, and update dbUrl variable with it in index.js<br/>
3.  go to localhost:3000/graphql and enter in graphQL queries to test it.<br/>
4.  Currently only has insert and request implemented, and request will return all data rows, since code for exporting data 
    to csv / zip not yet written<br/><br/>

example queries:<br/>
insert:<br/>
mutation {<br/>
 insertStudyData(data: {sessionId:"123", studyId:"444", datarows: [{data:[{id:"first", value:"second"}]}]})<br/>
}<br/>
<br/>
request: <br/>
query{<br/>
  getStudyData(studyId: "String!", startDate: "String", endDate: "String")<br/>
}<br/>
