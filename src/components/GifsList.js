import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as DeleteIcon } from '../assets/img/delete.svg';
import { ReactComponent as CopyIcon } from '../assets/img/link.svg';

//Copy URL from Gif
const copyLink = (gifUrl) => {
    let copyArea = document.createElement('textarea')
    copyArea.innerText = gifUrl
    document.body.appendChild(copyArea)
    copyArea.select()
    document.execCommand('copy')
    copyArea.remove()
}

//Display the Gif list that recieves from parent component
const GifsList = ({gifsList, deleteGif}) => {
    return (
        <div className="search__results">
            <ul className="search__results__list">
                {gifsList.map((gif, index) => 
                    <li className="search__results__list__item" key={gif.id}>
                        <div className="search__results__list__item__gif"
                            style={{  
                                backgroundImage: "url(" + gif.images.preview_gif.url + ")",
                            }}>
                        </div>
                        {/* CTAs for Copy and Delete Gif */}
                        <div className="search__results__list__item__overlay">
                            <DeleteIcon onClick={() => deleteGif(index)} className="search__results__list__item__overlay__icon" />
                            <CopyIcon onClick={() => copyLink(gif.url)} className="search__results__list__item__overlay__icon" />
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

GifsList.propTypes = {
    gifsList: PropTypes.array
};

export default GifsList