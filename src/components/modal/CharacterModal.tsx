import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import axios from 'axios';
import * as crypto from 'crypto';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    overflow: 'scroll',
    height: '100%',
    bgcolor: '#000',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface CharacterInfo {
    id: number; // The unique ID of the character resource.,
    name?: string;
    description: string;
    modified: string;
    resourceURI: string;
    urls: any[];
    thumbnail: { path: string; extension: string; };
    comics: any[];
    stories: any[];
    events: any[];
    series: any[];
}

interface CharacterData {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    data: {
        offset: number;
        limit: number;
        total: number;
        count: number;
        results: CharacterInfo[];
        etag: string;
    }
}


export default function CharacterModal(props: { handleSetQuery: () => {}, name: string; }) {
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState([]);
    const handleOpen = async () => {
        const pub_key = "7620c866f7a8251c6aebeb639562c510"
        const pri_key = "6270c7a7851c6755007a0296770f05917455afb5"
        const ts = Date.now()
        const h = crypto.createHash('md5').update(ts + pri_key + pub_key).digest("hex");
        const charURL = `https://gateway.marvel.com:443/v1/public/characters/`
        const url = `${charURL}?ts=${ts}&apikey=${pub_key}&hash=${h}&name={name}`
        const resp = await axios.get(url)
        setResponse(resp.data.data.results)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {
                            response.map((item, index) => {
                                return <img src={item.thumbnail.path + ".jpg"} />
                            })
                        }
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}