// Import required libraries
const {WebhookClient} = require('dialogflow-fulfillment');
const {BigQuery} = require('@google-cloud/bigquery');

// Instantiate BigQuery client
const bigquery = new BigQuery();

// Handle the Dialogflow fulfillment webhook request
exports.dialogflowFirebaseFulfillment = (request, response) => {
  const agent = new WebhookClient({ request, response });

  // Function to fetch data from BigQuery
  async function fetchData(columnName, value) {
    const query = `SELECT * FROM myDataset.myTable WHERE ${columnName} = '${value}'`;
    const [rows] = await bigquery.query(query);
    return rows;
  }

  // Function to handle the intent that queries the database
  function handleDatabaseQueryIntent(agent) {
    const columnName = agent.parameters.column_name;
    const value = agent.parameters.column_value;

    return fetchData(columnName, value).then(rows => {
      // If no results were found
      if (rows.length === 0) {
        agent.add(`Sorry, I couldn't find any results for ${columnName}=${value}.`);
      } else {
        // If results were found, format them and display them to the user
        let message = `Here are the results for ${columnName}=${value}:\n\n`;
        rows.forEach(row => {
          message += `Report No: ${row.REPORTNO}\n`;
          message += `Weight: ${row.WEIGHT}\n`;
          message += `Color: ${row.COLOR}\n`;
          // Add other columns as needed
          message += '\n';
        });
        agent.add(message);
      }
    });
  }

  // Set the Dialogflow intent handlers
  let intentMap = new Map();
  intentMap.set('DatabaseQueryIntent', handleDatabaseQueryIntent);
  agent.handleRequest(intentMap);
};
