'use strict';
const {WebhookClient} = require('dialogflow-fulfillment');
const {BigQuery} = require('@google-cloud/bigquery');
// Instantiate BigQuery client
const bigquery = new BigQuery({projectId:"appointmentscheduler-krpj"});

// create a new session client for Dialogflow
// const dialogflow = require('dialogflow');
// const sessionClient = new dialogflow.SessionsClient();


// define the columns to select from the table
const columns = 'REPORTNO, SHAPE, WEIGHT, CUT, POLISH, SYMN, COLOR, PURITY, FLUOR, MES1, MES2, MES3, TABLE, DEPTHPER, PER, `PRICE/CTS`, TOTAL, `RAP TOTAL`, VIDEOLINK, PDFLINK, CSTATUS, `COMPANY ID`, RATIO, CERT, RAP, `PRICE PER CARAT`, `ADDITIONAL_COLUMN`, VENDORNAME, CREATEDAT, LASTMODIFIEDAT, FRONTIMAGE, LINK COLUMN';
exports.dialogflowFirebaseFulfillment = async (req, res) => {
    const agent = new WebhookClient({ req, res });
    console.log("Parameters", agent.parameters);
    const message = req.body.queryResult.queryText;
    const response = await handleMessage(message);
    res.json(response);
}
// define the SQL query to fetch the required details based on user queries
function getQuery(query) {
  const shapeMap = {
    'RD': 'Round',
    'PE': 'Pear',
    'OV': 'Oval',
    'MQ': 'Marquise',
    'PR': 'Princess',
  };
  const weightMap = {
    '1.5-2': '1.5 <= WEIGHT AND WEIGHT <= 2',
    '1.75-2.25': '1.75 <= WEIGHT AND WEIGHT <= 2.25',
    '1.2-1.4': '1.2 <= WEIGHT AND WEIGHT <= 1.4',
    '1.5-1.75': '1.5 <= WEIGHT AND WEIGHT <= 1.75',
  };
  const colorMap = {
    'DEF': 'D OR E OR F',
    'H-K': 'H OR I OR J OR K',
    'F-H': 'F OR G OR H',
  };
  const vsMap = {
    'VVS+': 'VVS1 OR VVS2',
    'VS1+': 'VS1 OR VS2',
    'VS2+': 'VS2 OR SI1',
    'SI1+': 'SI1 OR SI2',
  };
  const shape = shapeMap[query.shape];
  const weight = weightMap[query.weight];
  const color = colorMap[query.color];
  const vs = vsMap[query.vs];
  return `SELECT ${columns} FROM \`your-project-id.your-dataset.your-table\` WHERE SHAPE = '${shape}' AND ${weight} AND COLOR IN (${color}) AND (PURITY = 'IF' OR PURITY = 'VVS1' OR PURITY = 'VVS2' OR PURITY = '${vs}')`;
}

// handle the user's query and fetch the required details from BigQuery
async function handleQuery(query) {
  const sqlQuery = getQuery(query);
  const [rows] = await bigquery.query(sqlQuery);
  const result = rows[0];
  return result;
}

// handle the user's message and send the response using Dialogflow
async function handleMessage(message) {
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
        },
        }
    }
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    const parameters = result.parameters.fields;
    const query = {
        shape: parameters.shape.stringValue,
        weight: parameters.weight.stringValue,
        color: parameters.color.stringValue,
        vs: parameters.vs.stringValue,
    };
    const data = await handleQuery(query);
    const responseText = "Here are the details for your query:\n${JSON.stringify(data)"
    const response = {
        fulfillmentText: responseText,
    };
    return response;
    }

    // handle the incoming request from Dialogflow and send the response back
    




