import styled from 'styled-components'
import Layout from '@c/Layout'

const Error = styled.h1`
    font-size: 70px;
    margin-bottom: 30px;
`

function PageNotFound(){
    return (
        <Layout>
           <Error>404</Error>
           <h3>Nothing to see here!</h3>

        </Layout>


    )
}
export default PageNotFound

