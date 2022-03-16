
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useToast } from '@chakra-ui/react'
import { height } from '@mui/system';

const theme = createTheme();

  const ProductAdd = () => {
    const toast = useToast()
    const [Img, SetImage] = useState({})
    const [Src, SetSrc] = useState("")
    const [Name, SetName] = useState("")
    const [price, setprice] = useState(0)
    const [desc, setdesc] = useState("")
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    useEffect(() => {
      SetSrc(createImageURL(Img)) 
    }, [Img])

    const createImageURL = (img) => {
      try{
       return window.URL.createObjectURL(img)
      } catch{
        return ""
      }
     }

     const Submit = () => {
       let payload = {"id":0, "original_owner":0, "owner": 0, "name": Name, "image": Src, "description": desc, "price_determinant": parseInt(price), "start_time": start, "end_time": end }
       api.post('product/add',payload)
        .then(res => {
          toast({
            title: 'Success',
            description: res.data.message,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }).catch(res => {
          console.log(res)
        })
     }
    return (
      <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{paddingX:'20vw', paddingY:'5vh'}} >
      <Typography gutterBottom variant="h5" component="div">
            Create New Item
          </Typography>
        <Stack spacing={2}  justifyContent="center" alignItems="center">
              <input id="imgholder" type="file" style={{display:"none"}} onChange={event => SetImage(event.currentTarget.files[0])} />
              <Box component="span" sx={{width: 400, height: 400, border: '1px dashed grey', }} onClick={ () => document.getElementById("imgholder").click()}>
                <img src={Src} width="300" height="300" style={{height:'100%', width:'100%'}} />
              </Box>
              <TextField label="Product Name" id="outlined-size-normal" value={Name} onChange={event => { SetName(event.currentTarget.value)}} sx={{width: 600}}/>
              <TextField label="Product Description" id="outlined-size-normal"  value={desc} onChange={event => { setdesc(event.currentTarget.value)}}  sx={{width: 600}}/>
              <TextField label="Product Price" id="outlined-size-normal" value={price} onChange={event => {setprice(event.currentTarget.value)}} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  sx={{width: 600}} />
              <LocalizationProvider dateAdapter={AdapterDateFns} style={{width: 600}}>
                <DateTimePicker
                    label="Start Time"
                    value={start}
                    onChange={setStart}
                    renderInput={(params) => <TextField {...params} style={{width: 600}}/>}
                    
                />
                 <DateTimePicker
                    label="End Time"
                    value={end}
                    onChange={setEnd}
                    renderInput={(params) => <TextField {...params} style={{width: 600}}/>}
                />
              </LocalizationProvider>
        </Stack>
        <Stack direction="row" spacing={5}  justifyContent="center" alignItems="center">
          <Button variant="contained" color="error" sx={{width:270}}>Cancel </Button>
          <Button variant="contained" color="success" onClick={Submit}  sx={{width:270}}>Submit </Button>
        </Stack>
      </Stack>
      </ThemeProvider>
      
    )
  }
  
  export default ProductAdd