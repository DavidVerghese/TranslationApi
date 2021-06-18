const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

const singleStory = {
  "pictureplacement": "right",
  "headline": "She was the most gentle soul’: Woman, 25, shot to death driving in Doraville",
  "description": `Carmen Cai Yi Lee was happiest when she was helping others. “She was the most gentle soul. Selfless,” Lee’s boyfriend, Petrus Reyes, told The Atlanta Journal-Constitution. “She was always doing something for someone else. I had to remind her, ‘Stop let’s take care of yourself first.’” Those closest to Lee are struggling to understand who would hurt her. As she drove home Saturday night, Lee was shot to death on Peachtree Industrial Boulevard, just south of Tilly Mill Road, according to Doraville police. Around 9:30 p.m., a concerned officer saw a vehicle stopped in the roadway. Lee was unresponsive in the driver’s seat and died from her injuries, police said.`,
  "imageAddress": `https://tributecenteronline.s3-accelerate.amazonaws.com/Obituaries/21286748/Image.jpeg`,
  "source": `https://www.ajc.com/news/she-was-the-most-gentle-soul-woman-24-shot-to-death-driving-in-doraville/WR6KM4TTLNDT7B4AUGHZVJHVVM/`,
  "caption": "Carmen Cai Yi Lee "
  }

let translatedData = [

]
let translatedData2 = [];

// GOOGLE TRANSLATE STUFF 

const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();
const CREDENTIALS = JSON.parse(process.env.credentials);
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id
});
const detectLanguage = async (text) => {
  try {
      let response = await translate.detect(text);
      return response[0].language;
  } catch (error) {
      console.log(`Error at detectLanguage --> ${error}`);
      return 0;
  }
}
      

const translateStory = async (text, targetLanguage) => {

  try {
    let index = text;
      let [pictureplacement] = await translate.translate(index.pictureplacement, targetLanguage);
      let [headline] = await translate.translate(index.headline, targetLanguage);
      let [description] = await translate.translate(index.description, targetLanguage);
      let [imageAddress] = await translate.translate(index.imageAddress, targetLanguage);
      let [source] = await translate.translate(index.source, targetLanguage);
      let [caption] = await translate.translate(index.caption, targetLanguage);

      let object = {
        pictureplacement: text.pictureplacement,
        headline: headline,
        description: description,
        imageAddress: text.imageAddress,
        source: text.source,
        caption: caption
      };

      
     
      return object;
  
  } catch (error) {
      console.log(`Error at translateText --> ${error}`);
      return 0;
  }
};



app.get("/", (req, res) => {
  res.send('Hello');
});

app.get("/chinesesimplified", (req, res) => {

  translateStory(singleStory, 'zh-CN')
  .then((res2) => {
    res.send(res2);
})
.catch((err) => {
    return err;
});
});

app.get("/japanese", (req, res) => {

  translateStory(singleStory, 'ja')
  .then((res2) => {
    res.send(res2);
})
.catch((err) => {
    return err;
});
});

app.get("/khmer", (req, res) => {

  translateStory(singleStory, 'km')
  .then((res2) => {
    res.send(res2);
})
.catch((err) => {
    return err;
});
});
app.get("/korean", (req, res) => {

  translateStory(singleStory, 'ko')
  .then((res2) => {
    res.send(res2);
})
.catch((err) => {
    return err;
});
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

