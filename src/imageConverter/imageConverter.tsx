import { useRef, useEffect, useState } from 'react';

import './imageConverter.css'

interface InputProps {
  characters: string, //input string of characters used for ascii-art
  size: number,
  invert: boolean,
  sourceImage: string
}

const ImageConverter = (props: InputProps) => {
  //string of characters transformed into array with optional inversion
  let characters: any = props.characters;
  const CHARS = props.invert ? characters.split("").reverse() : characters.split("");

  //canvas used for reference
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [convertedText, setConvertedText] = useState(['']);

  useEffect(() => {
    const img = new Image();
    img.src = props.sourceImage;

    const canvas = canvasRef.current;

    if(canvas !== null){
      const canvasContext2D = canvas.getContext('2d')!;
      img.onload = () => {
        img.width = props.size
        img.height = props.size
  
        canvas.width = img.width;
        canvas.height = img.height;
        canvasContext2D.drawImage(img, 0, 0, img.width, img.height);
        const imageData = canvasContext2D.getImageData(0, 0, img.width, img.height);
  
        setConvertedText(convertPixelsToString(imageData, img.width, img.height, CHARS));
      };
    } else {
      console.log("Canvas is null")
      //TODO: handle this possible error
    }
  }, []);

  return <>
    <canvas ref={canvasRef} />
    {convertedText.map(row => <p>{row}</p>)}
  </>;
};

function convertPixelsToString(imageData: ImageData, height: number, width: number, CHARS: string[]): string[] {
  let asciiTable: string[] = [];
  let charRow: string;
  const data = imageData.data;

  // for each horizontal pixel/character there are three vertical
  // this ratio is added in order to make result image more square
  for (let i = 0; i < height; i += 3) {
    charRow = ''
    for (let j = 0; j < width; j += 1) {
      //character for a corresponding pixel is chosen based on its brightness
      const index = (i * width + j) * 4;

      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];

      const brightness = (red + green + blue) / 3;

      let charId = Math.floor((brightness / 255) * (CHARS.length - 1));

      charRow += CHARS[charId]
    }
    asciiTable.push(charRow)
  }
  return asciiTable
}

export default ImageConverter
