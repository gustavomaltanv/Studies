import fs from 'fs';
import aws from 'aws-sdk';
import dotenv from 'dotenv';
import cron from 'node-cron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const axios = require('axios');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const SQS_QueueUrl = process.env.SQS_QUEUE_URL;

aws.config.update({ region: 'sa-east-1' });

const sqs = new aws.SQS();

const generateImage = async (fileName, err) => {
  if (err) {
    console.log("Error: " + err);
    return;
  }

  try {
    const response = await axios({
      url: 'https://random-image-pepebigotes.vercel.app/api/random-image',
      responseType: 'stream'
    });

    const filePath = path.join(__dirname, 'imgs', `${fileName}.png`);
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    writer.on('finish', () => {
      console.log('Image downloaded and saved as ' + fileName + '.png');
    });

    writer.on('error', (error) => {
      console.error('Error writing file:', error);
    });
  } catch (error) {
    console.error('Error fetching image:', error);
  }
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