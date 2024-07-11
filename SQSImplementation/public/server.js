import express from 'express';
import aws from 'aws-sdk';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({path: envPath});

const SQS_QueueUrl = process.env.SQS_QUEUE_URL;

const app = express();
const staticPath = process.cwd();

aws.config.update({ region: 'sa-east-1' });

const sqsInstance = new aws.SQS();

const port = 8081;

app.use(express.static(staticPath));
app.use(express.json());

app.listen(port, () => console.log("App running on port " + port));

app.post('/request_images', (req, res) => {
  const nImgs = parseInt(req.body.imgs);
  for (let i = 0; i < nImgs; i++) {
    sqsInstance.sendMessage(
      {
        MessageBody: "Generating images...",
        QueueUrl: SQS_QueueUrl
      },
      (err, data) => {
        err ? console.log("Error: " + err) : console.log("Success: " + data.MessageId);
      }
    );
  }

  console.log(req.body);
  res.json({ body: req.body, ok: true });
});