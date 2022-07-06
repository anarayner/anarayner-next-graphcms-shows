import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import Layout from '@c/Layout'
import FlexyRow from '@c/FlexyRow'
import { Title } from '@c/Title'
import { getShowBySlug } from '@l/graphcms'
import { formatUSD, formatDate } from '@l/utils'
import {useRouter} from 'next/router';

const Markdown = styled(ReactMarkdown)`
  img {
    width: 100%;
    border-radius: 20px;
    border: 4px solid currentColor;
  }
`

const ArtistName = styled.h2`
  text-align: center;
`

const Box = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
`

const ArtistPhoto = styled.div`
  background-image: url(${(p) => p.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border: 4px solid currentColor;
  margin: 20px auto;
`
const Button = styled.button`
  background: transparent;
  padding: 10px 30px;
  color: white;
  border-radius: 10px;
  border-color: white;

`
const Portrait = ({ images = [] }) => {
  if (images.length > 0) {
    const img = images[0]
    return (
      <ArtistPhoto imageUrl={img.url} />
    )
  }
  return null
}

export default function Shows({ show }) {
    const router = useRouter()

    return (
    <Layout title={`${show.title} / next-graphcms-shows`} maxWidth="900px" padding="0 2em">
      <Title>{show.title}</Title>

      <FlexyRow>
        <span>Price: {formatUSD(show.ticketPrice)}</span>
        <span>{formatDate(show.scheduledStartTime)}</span>
      </FlexyRow>
      <Markdown source={show.description} />

      {show.artists.map(artist => (
          <Box key={artist.id}>
              <div>
                  <ArtistName>{artist.fullName}</ArtistName>
                  <Portrait images={artist.images} />
              </div>
              <Button onClick={()=> router.push(`/artist/${artist.slug}`)}>Show more</Button>
          </Box>

      ))}
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { slug } = params
    const show = (await getShowBySlug(slug))
    if (!show) {
        return {
            notFound: true,
        };
    }
  return {
    props: { show },
  }
}
