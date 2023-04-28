
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComicModal from 'src/components/modal/ComicModal'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import generateApiHash, { ApiHash } from 'src/utils/generateApiHash';

const handleSubmit = (e) => {
  e.preventDefault()
  alert("you called")
  console.log(e.target.value)
}

const MyForm = () => {
  const [cname, setCname] = useState("");
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={cname} onChange={e => setCname(e.target.value)} />
        </div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
};

export default function Home() {

  const [info, setInfo] = useState([])
  const apiHash: ApiHash = generateApiHash()
  const charURL = "https://gateway.marvel.com:443/v1/public/characters"
  const url = `${charURL}?ts=${apiHash.ts}&apikey=${apiHash.pub_key}&hash=${apiHash.h}`


  const submitHandler = async (e: { target: { value: any[] | React.SetStateAction<string>; }; }) => {
    console.log("got calld")
    if (e.target.value?.length > 3) {
      console.log("")
      // const charURL = "https://gateway.marvel.com:443/v1/public/characters"
      // const url = `${charURL}?ts=${ts}&apikey=${pub_key}&hash=${h}&name=${e.target.value}`
      // setTimeout(async () => {
      //   const response = await axios.get(url)
      //   console.log(response.data)
      //   setInfo(response.data.data.results)
      // }, 5000);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url)
      console.log(response.data.data.results)
      response.data.data.results.map((item: any) => {
        console.log(item)
      })
      setInfo(response.data.data.results)
    }
    fetchData()
  }, [])

  interface Comic {
    id: number; //(int, optional): The unique ID of the character resource.,
    name: string; //, optional): The name of the character.,
    description: string;//, optional): A short bio or description of the character.,
    modified: string;
    resourceURI: string;//, optional): The canonical URL identifier for this resource.,
    urls: [];
    thumbnail: { path: string; extension: string };
    comics: [];
    stories: [];
    events: [];
    series: [];//(SeriesList, optional): A resource list of series in which this character appears.
  }

  return (

    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <MyForm />
        <Grid container spacing={2}>
          {info &&
            info.map((item: Comic, index) => {
              return (
                <Grid key={item.id} item xs={12} sm={6} md={3}>
                  <Card key={item.name} sx={{ maxWidth: 400 }}>
                    <CardMedia
                      sx={{ height: 400 }}
                      image={item.thumbnail.path + ".jpg"}
                      title={item.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {item.name}
                        <ComicModal name={item.name} />
                      </Typography>
                    </CardContent>
                  </Card>

                </Grid>)
            })
          }
        </Grid>

      </Container >
    </>
  )
}


