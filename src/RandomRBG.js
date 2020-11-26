import React from 'react';

function random(range) {
    return Math.round(Math.random() * range)
}

const RandomRBG = `rbga(${random(255)}, ${random(255)}, ${random(255)}, 1)`
console.log(RandomRBG)


export default RandomRBG;