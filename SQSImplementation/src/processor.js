import fs from 'fs';
import request from 'request';
import aws from 'aws-sdk';
import dotenv from 'dotenv';
import cron from 'node-cron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const SQS_QueueUrl = process.env.SQS_QUEUE_URL;

aws.config.update({ region: 'sa-east-1' });

const sqs = new aws.SQS();

const generateImage = (fileName, err) => {
  err ? console.log("Error: " + err) :
    request('https://random-image-pepebigotes.vercel.app/api/random-image').pipe(
      fs.createWriteStream(__dirname + '/imgs/' + fileName + '.png')
    );
};

const cycleProcess = () => {
  sqs.receiveMessage(
    {
      MaxNumberOfMessages: 10,
      QueueUrl: SQS_QueueUrl,
      WaitTimeSeconds: 10
    },
    (err, data) => {
      if (err) {
        console.log("Error: " + err)
      }
      else {
        console.log("Received messages: " + data.Messages.length);
        data.Messages.forEach(e => {
          generateImage(e.MessageId);
          sqs.deleteMessage({
            QueueUrl: SQS_QueueUrl,
            ReceiptHandle: e.ReceiptHandle
          },
            (err, data) => err ? console.log("Error: " + err) : console.log('Deleted message'))
        })
      }
    }
  );
};

cron.schedule('*/5 * * * * *', () => {
  console.log('Getting processed...');
  cycleProcess();
})