const express = require('express');
const connect = require('./config/database');

const app = express();

const TweetRepository = require('./repository/tweet-repository');
const Comment = require('./models/comment');
app.listen(3000, async () => {
    console.log('Server Started');
    await connect();
    console.log('Mongo db connected');
    // const tweet = await Tweet.create({
    //     content: 'Third Tweet',
    // });
    //const tweet = await Tweet.find({userEmail: 'a@b.com'});
    const tweetRepo = new TweetRepository();
    const tweet = await tweetRepo.getWithComments('63d2418f45ba19772112e6fc')
    console.log(tweet);
});