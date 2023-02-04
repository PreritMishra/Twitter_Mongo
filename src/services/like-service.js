import {LikeRepository, TweetRepository} from '../repository/index.js';
import Tweet from '../models/tweet.js';
class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }
    async toggleLike(modelId, modelType, userId){ // /api/v1/likes/toggle?id=modelid&type=Tweet
        if(modelType == 'Tweet') {
            var likeable = await this.tweetRepository.find(modelId);
            //.populate({path: 'likes'}); 
        } else if(modelType == 'Comment') {
            // TODO
            var likeable = await this.tweetRepository.find(modelId);

        } else {
            throw new Error('Unknown model type');
        }
        const exists  = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });
        console.log("exists", exists);
        if(exists) {
            likeable.likes.pull(exists.id);
            await likeable.save();
            await exists.remove();
            var isRemoved = false;
        } else {
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel: modelType,
                likeable: modelId
            });
            likeable.likes.push(newLike);
            await likeable.save();
            var isRemoved = true;
        }
        return isRemoved;
    }
}

export default LikeService; 