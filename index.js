require('dotenv').config()

const Twitter = require('twitter')

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const filter = [
    '#finances', '#javascript', '#wholefoods', '#ufc'
]

// Creating a stream which will receive data when any one of my filter is mentioned in a tweet
const stream = client.stream('statuses/filter', { 
    track: filter.join(',')
})

stream.on('data', (event) => {
    // console.log('event: ', JSON.stringify(event, null, 2))

    client.get('users/lookup', { user_id: event.user.id, screen_name: event.user.screen_name }, (error, user) => {
        console.log('error', error)
        console.log('user', JSON.stringify(user, null, 2))
    })
})
