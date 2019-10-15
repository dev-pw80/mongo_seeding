console.log('MongoDB - Backed');

const mongoose = require('mongoose');

const Post = require('./Post');

require('dotenv').config();

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true, useUnifiedTopology: true
});

(async () => {
    if (process.argv.includes("--delete")) {
        await Post.deleteMany()
    } else {
        const foundPost = await Post.find();
        console.log(foundPost);

        if (foundPost.length === 0) {

            let data = [{
                    titel: 'Erster Blogeintrag',
                    content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. obcaecati aliquam ipsa, deserunt cupiditate dicta fuga et? eos laborum autem unde voluptatibus, numquam minima. ea voluptatibus deserunt autem tempora ratione quasi?'
                },
                {
                    titel: 'Zweiter Blogeintrag',
                    content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. obcaecati aliquam ipsa, deserunt cupiditate dicta fuga et? eos laborum autem unde voluptatibus, numquam minima. ea voluptatibus deserunt autem tempora ratione quasi?'
                }
            ];

            const createdPost = await Post.insertMany(data);
        }
    }
    process.exit();
})();