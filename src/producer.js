const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['127.0.0.1:9094'],
});

const produceMessage = async () => {
  const producer = kafka.producer();

  await producer.connect();
  console.log('produce message');
  await producer.send({
    topic: 'test-topic',
    messages: [{ value: 'Hello Kafka user!' }],
  });

  await producer.disconnect();
};

produceMessage();
