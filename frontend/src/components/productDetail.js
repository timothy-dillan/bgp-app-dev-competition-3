import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Button, CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import { fontSize } from '@mui/system';
import Container from '@mui/material/Container';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const ProductDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [Name, SetName] = useState("")
    const [price, setprice] = useState(0)
    const [desc, setdesc] = useState("")
    const [start, setStart] = useState(new Date());
    const [start_time, setStartTime] = useState("");

    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        api.get('product/detail/' + id)
            .then(res => {
                console.log(res)
                if (res.status !== 200) {
                    return
                }
                //SetSrc(res.data.data.image)
                SetName(res.data.data.name)
                setprice(res.data.data.price_determinant)
                setdesc(res.data.data.description)
                setStart(res.data.data.start_time)
                //setEnd(res.data.data.end_time)
            }).catch(res => {
                navigate('/login', { replace: true })
            })
    }, []);
    useEffect(() => {
        let d = new Date(start)
        setStartTime(d.toLocaleDateString('id-ID') + " " + d.toLocaleTimeString())
    }, [start]);

    return (
        <Container maxWidth="lg" sx={{ paddingX: '20vw', paddingY: '8vh' }} >
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            sx={{ height: "26vw" }}
                            image="https://source.unsplash.com/random"
                        />
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }} textAlign="left">
                        Owner Name
                    </Typography>
                    <Typography variant="h3" textAlign="left">
                        {Name}
                    </Typography>
                    <Typography variant="h5" textAlign="left" style={{ marginTop: "1vh" }}>
                        <AccessTimeIcon></AccessTimeIcon> Sale starts at September 8, 2022 at 5:18 AM WIB
                    </Typography>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ marginTop: "1vh" }}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Offer Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography variant="body1" textAlign="left">
                                        Current Price
                                    </Typography>
                                    <Typography variant="h4" textAlign="left" style={{ marginTop: "2vh" }}>
                                        💵 90k
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" textAlign="left">
                                        Your bid
                                    </Typography>
                                    <Typography variant="h4" textAlign="left" style={{ marginTop: "1vh" }}>
                                        <TextField required placeholder="💵 90k" id="outlined-size-normal" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} name="price_determinant" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button variant="contained" size="large" style={{ width: "100%", height:"100%", marginLeft:"4vh"}}>Bid Now</Button>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>Product Description</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography textAlign="left">
                                {desc}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>Offers</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </Container>

    )
}

export default ProductDetail