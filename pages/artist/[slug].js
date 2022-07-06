import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import Layout from '@c/Layout'
import FlexyRow from '@c/FlexyRow'
import { Title } from '@c/Title'
import { getShowBySlug } from '@l/graphcms'
import { formatUSD, formatDate } from '@l/utils'
import {getArtistsBySlug} from '../../lib/graphcms';

const Markdown = styled(ReactMarkdown)`
  img {
    width: 100%;
    border-radius: 20px;
    border: 4px solid currentColor;
  }
`

const ArtistName = styled.h1`
  text-align: center;
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

const Portrait = ({ images = [] }) => {
  if (images.length > 0) {
    const img = images[0]
    return (
      <ArtistPhoto imageUrl={img.url} />
    )
  }
  return null
}

export default function Shows({ artist }) {
  return (
    <Layout title={`${artist.fullName} / next-graphcms-shows`} maxWidth="900px" padding="0 2em">


        <div key={artist.id}>
            <ArtistName>{artist.fullName}</ArtistName>

            <Portrait images={artist.images} />

            <FlexyRow justify="flex-start">
                {artist.spotifyUrl && <a href={artist.spotifyUrl} target="_blank">Spotify</a>}
                {artist.webUrl && <a href={artist.webUrl} target="_blank">Website</a>}
                {artist.facebookUrl && <a href={artist.facebookUrl} target="_blank">Facebook</a>}
                {artist.instagramUrl && <a href={artist.instagramUrl} target="_blank">Instagram</a>}
                {artist.youTubeUrl && <a href={artist.youTubeUrl} target="_blank">YouTube</a>}
            </FlexyRow>

            <Markdown source={artist.bio} />

        </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { slug } = params
    const artist = (await getArtistsBySlug(slug))
    if (!artist) {
        return {
            notFound: true,
        };
    }
  return {
    props: { artist },
  }
}
