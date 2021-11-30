import herolist from './herolist.json';

export default {
    'POST /apimock/freeheros.json': (req, res) => {
        const { number } = req.body;
        let getRandomArrayElements = (arr, count) => {
           let shuffled = arr.slice(0),
                i = arr.length,
                min = i -count,
                temp,
                index;
            
            while (i-- > min) {
                index = Math.floor(Math.random() * (i+1));
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }
            return shuffled.slice(min);
        }

        const freeheros = getRandomArrayElements(herolist, number);
        res.send(freeheros);
    }
}