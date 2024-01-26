import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import Cropper from "react-easy-crop"
import { Flex,Box,Input,Checkbox, Stack,Center } from "@chakra-ui/react";

const Imagecropper = ({image,onCropCancel,onCropDone}) => {

    const [crop,setcrop ] = useState({x:0,y:0});
    const [zoom,setZoom] = useState(1)

    const [croppedArea, setCroppedArea] = useState(null);
    const [aspectRatio, setAspectRatio] = useState(4/3)
    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) =>{
setCroppedArea(croppedAreaPixels)
    }
    const onAspectRatioChange = (event) =>{
        setAspectRatio(event);
    }



  return (
    <Stack >
    <Box>
    <Cropper
    image={image}
    aspect={aspectRatio}
    crop={crop}
    zoom={zoom}
    onCropChange={setcrop}
    onZoomChange={setZoom}
    onCropComplete={onCropComplete}
    style={{
        containerStyle:{
            width:"100%",
            height:"100%",
            backgroundColor:"#fff",

        }
    }}
    
    
    />
    
    </Box>
    <Box className="action-btns">
    <Box className="action-btns">
      <Stack spacing={4} color={'white'}>
        <Checkbox
          isChecked={aspectRatio === 1 / 1}
          onChange={() => onAspectRatioChange(1 / 1)}
        >
          1:1
        </Checkbox>
        <Checkbox
          isChecked={aspectRatio === 5 / 4}
          onChange={() => onAspectRatioChange(5 / 4)}
        >
          5:4
        </Checkbox>
        <Checkbox
          isChecked={aspectRatio === 4 / 3}
          onChange={() => onAspectRatioChange(4 / 3)}
        >
          4:3
        </Checkbox>
        <Checkbox
          isChecked={aspectRatio === 3 / 2}
          onChange={() => onAspectRatioChange(3 / 2)}
        >
          3:2
        </Checkbox>
        <Checkbox
          isChecked={aspectRatio === 5 / 3}
          onChange={() => onAspectRatioChange(5 / 3)}
        >
          5:3
        </Checkbox>
        <Checkbox
          isChecked={aspectRatio === 16 / 9}
          onChange={() => onAspectRatioChange(16 / 9)}
        >
          16:9
        </Checkbox>
        <Checkbox
          isChecked={aspectRatio === 3 / 1}
          onChange={() => onAspectRatioChange(3 / 1)}
        >
          3:1
        </Checkbox>
      </Stack>
    </Box>
     

    </Box>
    <Box className="btn-container" marginTop={'9%'}>
            <Button className="btn" onClick={onCropCancel}>Cancel</Button>
            <Button className="btn" onClick={()=>{
                onCropDone(croppedArea)
                console.log(croppedArea);
            }}>Crop</Button>


        </Box>

    
    </Stack>
  )
}

export default Imagecropper;
