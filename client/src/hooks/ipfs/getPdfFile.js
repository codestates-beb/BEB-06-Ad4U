import axios from 'axios';
import crypto from 'crypto-js';
import { triggerBase64Download } from 'common-base64-downloader-react';
import lockPdfImg from '../../dummyfiles/document.png';
import downloadPdfImg from '../../dummyfiles/download-pdf.png';
import { useState } from 'react';


const handleFileImg = (e) => {
  if(e.target.src === downloadPdfImg) {
    e.target.src = lockPdfImg;
  } else {
    e.target.src=downloadPdfImg;
  }
}
const dataURLtoBase64 = (dataurl) => {

  var arr = dataurl.split(',')
  
  return arr[1];
}

const handleViewPdf = async (token_uri, title, createdAt) => {
  const secretKey = process.env.REACT_APP_SECRET_KEY;

    const options = {
      url: token_uri,
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    }
    
    await axios.request(options)
    .then(res => {
      console.log(res.data)
      //복호화
        const bytes = crypto.AES.decrypt(res.data, secretKey);
        const decrypted = bytes.toString(crypto.enc.Utf8);
        const decrypted_base64 = "data:application/pdf;base64,"+dataURLtoBase64(decrypted);
        triggerBase64Download(decrypted_base64, `${title}_${createdAt}`)
    })
}

export { handleFileImg, dataURLtoBase64, handleViewPdf };