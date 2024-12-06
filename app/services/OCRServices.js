
const vision = require('@google-cloud/vision');
const path = require('path');
const fs = require('fs');
const { text } = require('body-parser');

let dotenv = require('dotenv').config();
if (dotenv.error) {
    throw dotenv.error;
}
const client = new vision.ImageAnnotatorClient({
    credentials: {
        client_email: process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
});

const recognize = async (file) => {
    const filePath = file.path;
    const [result] = await client.textDetection(filePath);
    const detections = result.textAnnotations;

    const extractedText = detections[0].description;

     const nibMatch = extractedText.match(/NIB[.\s]+([\w\d]+)/);
     const luasMatch = extractedText.match(/seluas\s([\d\s]+M²)/);
     const pemegangHakMatch = extractedText.match(/PEMEGANG HAK\s([\s\S]*?)\nCATATAN/);

     const nib = nibMatch ? nibMatch[1].trim() : null;
     const luas = luasMatch ? luasMatch[1].trim() : null;
     const pemegangHak = pemegangHakMatch ? pemegangHakMatch[1].trim().replace(/\n/g, ', ') : null;

    await fs.unlinkSync(filePath);

    const data = {
        id: nib ? nib : "Tidak Ditemukan",
        luas: luas ? luas : "Tidak Ditemukan",
        pemegangHak: pemegangHak ? pemegangHak : "Tidak Ditemukan",
    }

    return data;

}

module.exports = {
    recognize,
}