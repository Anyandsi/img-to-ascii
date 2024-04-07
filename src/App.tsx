import ImageObject from './imageConverter/imageConverter'
//file upload is not yet implemented
import sourceImage from './image.png'

function App() {

  return (
    <ImageObject characters={`@#B%?*+/:,.`} size={200} invert={false} sourceImage={sourceImage}/>
  )
}

export default App
