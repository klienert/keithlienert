import React from "react";

const Card = ({ title, text, url}) => {

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-text">{text}</p>                
            </div>
            <div className="card-footer">
                <a href={url} target="_blank" className="card-link">{title}</a>
            </div>
        </div>

    )

}
export default Card;