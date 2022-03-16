
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { SnackbarAlert } from '../components/SnackbarAlert';


const ProductAdd = () => {
  const navigate = useNavigate();
  const [src, setSrc] = useState(require('./images/empty.png'))
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("Successfully added product.");

  const showSnackbar = () => {
    setOpen(true);
  };

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const SetImageSrc = (img) => {
    setSrc(window.URL.createObjectURL(img))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userID = 0;
    api.get('user_id/from_session')
      .then(res => {
        userID = parseInt(res.data.data)
        let payload = {
          "original_owner": userID,
          "owner": userID,
          "name": data.get('name'),
          "image": src,
          "description": data.get('description'),
          "price_determinant": parseInt(data.get('price_determinant')),
          "start_time": start,
          "end_time": end
        }
        api.post('product/add', payload)
          .then(res => {
            showSnackbar();
            setSeverity("success");
            setMessage("Successfully added product.");
            setTimeout(function () {
              navigate('/product/list', { replace: true })
            }, 1000);
          }).catch(res => {
            showSnackbar();
            setSeverity("error");
            setMessage("Failed to add product.");
            console.log(res)
            setTimeout(function () {
              navigate('/login', { replace: true })
            }, 1000);
          })
      }).catch(res => {
        setSeverity("error");
        setMessage("Failed to add product.");
        console.log(res)
        setTimeout(function () {
          navigate('/login', { replace: true })
        }, 1000);
      })
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <SnackbarAlert open={open} closeSnackbar={closeSnackbar} severity={severity} message={message} />
      <Stack spacing={2} sx={{ paddingX: '20vw', paddingY: '8vh' }} >
        <Typography gutterBottom variant="h4" sx={{ fontWeight: 'bold' }} component="div" textAlign="left">
          Create New Item
        </Typography>
        <Typography variant="body1" display="block" textAlign="left">
          Fields marked with the astersik symbol (<span style={{ color: '#DD6B20', fontWeight: 'bold' }}>*</span>) is required.
        </Typography>
        <Typography variant="h6" style={{ fontWeight: 'bold' }} textAlign="left">
          Image <span style={{ color: '#DD6B20', fontWeight: 'bold' }}>*</span>
        </Typography>
        <input id="imgholder" type="file" style={{ display: "none" }} onChange={event => SetImageSrc(event.currentTarget.files[0])} />
        <Box component="span" sx={{ width: "40%", height: "40%" }} onClick={() => document.getElementById("imgholder").click()}>
          <img src={src} width="300" height="300" style={{ height: '100%', width: '100%' }} />
        </Box>
        <Typography variant="h6" style={{ fontWeight: 'bold' }} textAlign="left">
          Name <span style={{ color: '#DD6B20', fontWeight: 'bold' }}>*</span>
        </Typography>
        <TextField required placeholder="Item Name" id="outlined-size-normal" name="name" />
        <Typography variant="h6" style={{ fontWeight: 'bold' }} textAlign="left">
          Description <span style={{ color: '#DD6B20', fontWeight: 'bold' }}>*</span>
        </Typography>
        <Typography variant="caption" display="block" textAlign="left" style={{ marginTop: '-2px' }}>
          The description will be included on the item's detail page underneath its image.
        </Typography>
        <TextField required placeholder="Lorem ipsum dolor sit amet.." id="outlined-size-normal" name="description" />
        <Typography variant="h6" style={{ fontWeight: 'bold' }} textAlign="left">
          Product Price Determinant <span style={{ color: '#DD6B20', fontWeight: 'bold' }}>*</span>
        </Typography>
        <Typography variant="caption" display="block" textAlign="left" style={{ marginTop: '-2px' }}>
          The product price determinant determines the allowed number multiple a user can bid for your item.
        </Typography>
        <TextField required placeholder="Multiple of 5, 8.." id="outlined-size-normal" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} name="price_determinant" />
        <Typography variant="h6" style={{ fontWeight: 'bold' }} textAlign="left">
          Start Time <span style={{ color: '#DD6B20', fontWeight: 'bold' }}>*</span>
        </Typography>
        <Typography variant="caption" display="block" textAlign="left" style={{ marginTop: '-2px' }}>
          Fill in the start time for the time when you'd like users to start bidding.
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
          <DateTimePicker
            label="Start Time"
            value={start}
            onChange={setStart}
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography variant="h6" style={{ fontWeight: 'bold' }} textAlign="left">
            End Time <span style={{ color: '#DD6B20', fontWeight: 'bold' }}>*</span>
          </Typography>
          <Typography variant="caption" display="block" textAlign="left" style={{ marginTop: '-2px' }}>
            The end time is the time when you'd like users to stop bidding and find a winner.
          </Typography>
          <DateTimePicker
            label="End Time"
            value={end}
            onChange={setEnd}
            name="end_time"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button type="submit" fullWidth variant="contained" sx={{ width: 270 }}>Create </Button>
      </Stack >
    </Box>
  )
}

export default ProductAdd