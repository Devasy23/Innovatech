'use strict';

const functions = require('firebase-functions');
const {google} = require('googleapis');
const {WebhookClient} = require('dialogflow-fulfillment');
const BIGQUERY = require('@google-cloud/bigquery');


// Enter your calendar ID below and service account JSON below
const serviceAccount = {
  "type": "service_account",
  "project_id": "appointmentscheduler-krpj",
  "private_key_id": "060fd3aca9b965553f69cc84130281b54877a6ac",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCccrwue7ZQaRoC\n6/HAsxc0efotekIMG3JyCPhoXPDlfDFVdkfOUus+B2aikuBhOHy1WeBScjNu2lKT\nvWg2Onvw69xA+NG7nvWN3LPKrO9acfppi1BNDzVp7BK+dv/VG5pnKH1hbMEIXFOg\n/scVOJkiqlw/rSSEYopNIDKMTKVynNecFa6SnjTJevna0n79PYaC4CL+/BtXNPgh\nFDJV+uug/i8AniUdBzFiin0AuNaXlX/x0ze60SyT8M+jUWzg0CT1NTmbaT9bKytd\noNxPf2LOpCHMFdv3U50cPaWLbRGNl9ZpVR2j0cx58w3UdT9o7+s8k9NYD3mX3fEQ\nrdifsL/JAgMBAAECggEAEexDCsA5frTLuhH1vDHIMsbWlmcvMdvjHJVSgAJFxsSX\nkkbeqxBsyspmQ7G36uthvhTx0gArTEPOugY07iF9GXir3vWicXAgiYQDRPDS6vWr\nznObW3imkd/ttcxEOtHSuoa09nhTFPYezo7hl9jIEmSZ9OGNEW2IkpVhtRkCy0Jm\nn/JLleCW47PFQu0mSoNxlJlXqITQ7R3qU/NTdzHF6lBASCoFZWb451b7iB+vhDL2\noEWC3VwgAfsNpezB/fxN2/ZZJ0dGef/hOyupYgIuRvA5L6dllPsLKk9tJZAoYQJ6\nMFLnSSHRy7v+u+4ts0HGUxaJGtZHifYbGEhFPYO4QQKBgQDY+wgHjujDtlcd8u3V\nszrE2+LmM3o/wYWcaFvr0xWeFz7lucZWin9/P2IKqMCdBDzhHtuL4PUT2EXXVTFW\nX/kHULbIrbIA+Lwns5B7YY6YT7OFDwFhFlmoMwxdVzIAnvtkB2i7lo7usEkoN4ts\nMREWL7xd4Ga0QSibsqdR1eWk5QKBgQC4lQUTb9u9lBKBQJl4Vlzn1uXoCN2Y9iaU\niBv+r3PKVHtpuQ630LXaSvy0YsVdUCim5aXeN3TN67VZG3GDqAqs+iNusN9IKTTw\nd0wY/wEC7Bnu/BJBclgyGlcUerLihTjpN5sb8n3SjQvgKPPct2k2Q+m6btCmx5TW\nTwticr7FFQKBgQC4vJJLjRsUdoyZjRl9lsl0jhoTEMUGv0d4sUmB8Qg4v2XnxVHe\noLCIsHhSxvanONJ0gQc/gtpmeP6NpZUKC1BFMC1PksM5HI1l5/YddiQn/cPEh9AO\nzy6qjDv8xJ5n9PPoaH59KGStSB4hRZlJFkWL9DyWWNZYphli5qqafFi3GQKBgD8T\nzdRCmZlDjL9W0Btrh/xCV/bfcLrhA3YmvUpfsvYlwLb0Yq82R679iTYrur6Usg+2\n0uQJl4T3U9XLpxMSzfMm2AzvrJ4AVvMGEZ9JJZNWE9azlZl/9dvJXJDHDXKTjEtG\nkV8Pkyfsw24rEIsQsoe01Z68V9lmwtop0P4nsEGxAoGBALBzJuM2CbGRVk2ObXde\nlNPdiK1CD1zCktwRcnDHGFdTPFC2NrpMemmukkE5dOpBK2pt8Ep/8G9RwAWM5L3e\nTkHR7DS1Ulz2DTIoT/drsDGoSviG8rZinsgJ77X/S3q5xz84Q4Wda1mgZBWTUpJN\nX2ErNoys5mn5mI02no+R47u3\n-----END PRIVATE KEY-----\n",
  "client_email": "appointment-scheduler@appointmentscheduler-krpj.iam.gserviceaccount.com",
  "client_id": "115902407470306122429",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/appointment-scheduler%40appointmentscheduler-krpj.iam.gserviceaccount.com"
};

process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements

const timeZone = 'Asia/Colombo';
const timeZoneOffset = '+05:30';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log("Parameters", agent.parameters);
  const appointment_type = agent.parameters.AppointmentType;

// Function to create appointment in calendar  
function makeAppointment (agent) {
    // Calculate appointment start and end datetimes (end = +1hr from start)
    const dateTimeStart = new Date(Date.parse(agent.parameters.date.split('T')[0] + 'T' + agent.parameters.time.split('T')[1].split('-')[0] + timeZoneOffset));
    const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
    const appointmentTimeString = dateTimeStart.toLocaleString(
      'en-US',
      { month: 'long', day: 'numeric', hour: 'numeric', timeZone: timeZone }
    );
  
	addToBigQuery(agent, appointment_type);

//Add data to BigQuery
function addToBigQuery(agent, appointment_type) {
    const date_bq = agent.parameters.date.split('T')[0];
    const time_bq = agent.parameters.time.split('T')[1].split('-')[0];
    const projectId = 'appointmentscheduler-krpj'; 
    const datasetId = "appointmentscheduler-krpj.demo123";
    const tableId = "appointmentscheduler-krpj.demo123.demo";
    const bigquery = new BIGQUERY({
      projectId: projectId
    });
   const rows = [{date: date_bq, time: time_bq, type: appointment_type}];
  
   bigquery
  .dataset(datasetId)
  .table(tableId)
  .insert(rows)
  .then(() => {
    console.log(`Inserted ${rows.length} rows`);
  })
  .catch(err => {
    if (err && err.name === 'PartialFailureError') {
      if (err.errors && err.errors.length > 0) {
        console.log('Insert errors:');
        err.errors.forEach(err => console.error(err));
      }
    } else {
      console.error('ERROR:', err);
    }
  });
  agent.add(`Added ${date_bq} and ${time_bq} into the table`);
}
}
})
