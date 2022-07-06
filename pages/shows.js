import Layout from '@c/Layout'
import { Grid, Card } from '@c/Grid'
import { Title } from '@c/Title'
import { getAllShows } from '@l/graphcms'
import {useState} from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import {formatUSD} from '../lib/utils';
const moment = require('moment');

const ListCard = styled.div`
  text-align: center;
  width: 700px;
  border: 1px white solid;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 10px;
  cursor:pointer;
  &:hover {
    background: white;
    color: black;
  }
`
const Button = styled.button`
  background: transparent;
  padding: 10px 30px;
  margin: 20px;
  color: white;
  border-radius: 10px;
  border-color: white;
`

export default function Shows({ initialShows }) {
  const [view, setView] = useState('list')
    const [shows, setShows] = useState(initialShows)

    const router = useRouter()
    console.log('shows', shows)

  const sortByPrice = (shows) =>{
      setShows([...shows].sort((a,b) => a.ticketPrice -b.ticketPrice))
  }
    const sortByTitle = (shows) =>{
        setShows([...shows].sort((a,b) => a.title.localeCompare(b.title)))
    }
  return (
    <Layout title="next-graphcms-shows / Shows">
      <Title>Shows</Title>
      <div>
        <Button onClick={()=>{
            setView('grid')
        }}>Grid</Button>
          <Button onClick={()=>{
              setView('list')
          }}>List</Button>
          <Button onClick={()=>{
              sortByPrice(shows)
          }}>Sort by price</Button>
          <Button onClick={()=>{
              sortByTitle(shows)
          }}>Sort by Title</Button>

      </div>
        <Grid>
        {view === 'grid'&& shows.map(show => (
          <Card href={`/show/${show.slug}`} header={show.title} key={show.id}>
            <p>{show.artists.map(({ fullName }) => fullName).join(', ')}</p>
          </Card>
        ))}
      </Grid>
      {view === 'list'&& shows.map(show => (
          <ListCard onClick={()=> router.push(`/show/${show.slug}`)}  key={show.id}>
            <h2>{show.title}</h2>
            <p>{show.title} {show.artists.map(({ fullName }) => fullName).join(', ')}</p>
            <h4>{moment(show.scheduledStartTime).format('LLL')}</h4>
            <h3>Price: {formatUSD(show.ticketPrice)}</h3>
          </ListCard>
      ))}
    </Layout>
  )
}

export async function getServerSideProps() {
  const initialShows = (await getAllShows()) || []
  return {
    props: { initialShows},
  }
}
