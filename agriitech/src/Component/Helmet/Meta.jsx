import React from 'react';
import {Helmet} from 'react-helmet';
import './Meta.css';

const Meta = ({title,description,keywords})=>{
    return(
        <div className="background-container">
        <div className="content">
          {/* Your content here */}
          <h1>Hello, World!</h1>
        </div>
      </div>
    )
}

Meta.defaultProps = {
    title:'Welcome To AgriTech',
    description:'Agricultural website by the Department of Agriculture (DoA) of India along with keels',
    keywords: 'farmers, argio, department of agriculture, agricultural science'

}

export default Meta;