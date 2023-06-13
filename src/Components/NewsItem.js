import React, { Component } from 'react'

export default class News extends Component {
    render() {
        let { title, description, imageUrl, NewsUrl, author, date,source} = this.props;
        return (
            <div>
                <div className="card">
                    <img src={!imageUrl ? "https://images.freeimages.com/images/previews/ac9/railway-hdr-1361893.jpg" : imageUrl} className="card-img-top" alt="..." />
            
                        <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:0}}>
                        <span className="badge rounded-pill bg-danger">
                            {source}
                        </span>
                        </div>
                        <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} at {new Date(date).toGMTString()}</small></p>
                        <a href={NewsUrl} target="/" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
