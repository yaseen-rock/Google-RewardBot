require('dotenv').config();
const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  const uri = process.env.MONGOOSE_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const collection = client.db('test').collection('User');
    const updateResult = await collection.updateMany({}, { $set: { credits: 100 } });
    return { statusCode: 200, body: JSON.stringify(updateResult) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify(err) };
  } finally {
    await client.close();
  }
};
