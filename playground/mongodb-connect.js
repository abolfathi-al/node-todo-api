const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  
  if(err)
    return console.log('Unable to connect MongoDB server');

  console.log('Connect to MongoDB server');

  const db = client.db('TodoApp');
  
  // db.collection('Todes').insertOne({
  //   text: 'Someting to do',
  //   completed: false,
  //   brithDate: new Date(2006,10,30)
  // }, (err, result) => {
  //   if(err)
  //     return console.log('Unable to insert todo', err);

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Todes').find().toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos',err);
  });

  db.collection('Todes').findOneAndUpdate({
    _id: new ObjectId("5b79415532bb0223f613c8a4")
  }, {
    $set: {
      text: 'philip morris',
      currency: 'USD'
    }
  }, {
    returnOriginal: false
  }
  ).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  })

  //client.close();
});