import React, {useState} from 'react'
import ImageConverter from './imageConverter/imageConverter'

function App() {
  const [inputImage, setInputImage] = useState<File | null>(null);
  
  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) setInputImage(file);
  }

  return (
    <div className="wrapper">
      <ImageConverter characters={"$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/()1{}[]?-_+~<>i!lI;:,."} size={200} invert={true} sourceImage={inputImage}/>
      <input
        type='file'
        accept='image/jpg, image/png, image/jpeg'
        onChange={handleImageInput}
      />
    </div>
  )
}

export default App
