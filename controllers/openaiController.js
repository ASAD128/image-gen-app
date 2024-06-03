const openai = require('../config/openaiConfig')
const generateMeta = async (req, res) => {

    const { title } = req.body
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "user",
                "content": `Please write a description for the ${title}`
            }
        ],
        max_tokens: 100
    });

    const tags = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: `Please generate 10 keywords or tags for the ${title}`
        }],
        max_tokens: 100
    })

    res.status(200).json({
        description: chatCompletion.choices[0].message,
        tags: tags.choices[0].message
    })

    //console.log(chatCompletion.choices[0].message);
}

const generateImage = async (req, res) => {

    const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: req.body.prompt,
        n: 1,
        size: "1024x1024"
    });

    res.status(200).json({
        url: image.data[0].url
    })

    //console.log(image.data[0].url);
}

module.exports = { generateMeta, generateImage }