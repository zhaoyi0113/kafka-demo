const { Kafka } = require('kafkajs');

const groupId = process.argv[1] || 'test-group';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['127.0.0.1:9094'],
});

const consumeMessage = async () => {
  const consumer = kafka.consumer({ groupId });

  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('get message:', topic, partition, {
        value: message.value.toString(),
      });
    },
  });
};

consumeMessage();