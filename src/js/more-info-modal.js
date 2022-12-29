'use strict';
import { fetchVideo } from "./fetch-video";

const moreInfoModal = document.querySelector(".more-info-modal")


fetchVideo("Pretty Woman", 1)
    .then(data => {
        console.log(data)
        const dataArray = data.results;
        const example = dataArray[0]
    })
    .catch(error => {
        console.error(error)
    })

const renderModal = example => {
    return `<div></div>`
};