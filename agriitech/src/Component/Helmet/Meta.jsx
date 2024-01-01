import React from 'react';
import {Helmet} from 'react-helmet';

const Meta = ({title,description,keywords})=>{
    return(
        <Helmet>
            <title> {title}</title>
            <meta name = 'description' content={description} />
            <meta name = 'keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title:'Welcome To AgriTech',
    description:'Agricultural website by the Department of Agriculture (DoA) of India along with keels',
    keywords: 'farmers, argio, department of agriculture, agricultural science'

}

export default Meta;