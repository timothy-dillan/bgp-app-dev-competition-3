import * as React from 'react'
import { ThemeProvider } from '@emotion/react';
import { Card, CardContent, CardMedia, Chip, createTheme, Typography } from "@mui/material";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import HourglassDisabledRoundedIcon from '@mui/icons-material/HourglassDisabledRounded';

const GetBidState = (currentBid, myBid) => {
    if (myBid >= currentBid) {
        return "won";
    }
    return "lost"
}

export const BidCard = ({ product_name, product_image, my_bid, current_bid, status }) => {
    const state = GetBidState(current_bid, my_bid);
    return (
        <Card sx={{ maxWidth: 250, margin: 4 }}>
            <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/random"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold ' }}>
                    {product_name}
                </Typography>
                {status === "end" ?
                    <>
                        <Chip icon={<CheckCircleOutlineRoundedIcon />} label="Ended" sx={{ marginBottom: 2 }} variant="outlined" />
                        {state === "won" ?
                            <Typography color={"green"} sx={{ fontWeight: 'bold' }}>
                                You won this product.
                            </Typography> : undefined
                        }
                        {state === "lost" ?
                            <Typography color={"red"} sx={{ fontWeight: 'bold' }}>
                                You lost this product.
                            </Typography> : undefined
                        }
                    </>
                    : undefined
                }
                {status === "in_progress" ?
                    <>
                        <Chip icon={<AccessTimeRoundedIcon />} label="In Progress" color="success" sx={{ marginBottom: 1 }} variant="outlined" />
                        <Typography>
                            Current bid: <span style={{ color: '#DD6B20', fontWeight: 'bold' }}>{current_bid}</span>
                        </Typography>
                        <Typography>
                            Your bid:  <span style={{ color: '#38B2AC', fontWeight: 'bold' }}>{my_bid}</span>
                        </Typography>
                    </>
                    : undefined
                }
                {status === "not_started" ?
                    <>
                        <Chip icon={<HourglassDisabledRoundedIcon />} label="Not Started" color="primary" variant="outlined" />
                    </>
                    : undefined
                }
            </CardContent>
        </Card>
    );
}