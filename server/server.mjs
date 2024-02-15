import express from 'express';

const app = express();

const PORT = process.env.PORT ?? 5000;

const answer = "hello";

const POSITION_CORRECT = "Y";
const POSITION_INCORRECT = "N";
const POSITION_NOTINANY = "?";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/wordle', ({ query }, res) => {
    // if no parameters, or if guess does not exists, or if it exists but is the wrong length
    if (Object.keys(query).length === 0 || typeof query.guess !== 'string' || query.guess.length !== answer.length) {
        // return a string indicating all positions wrong BUT providing the length
        res.json(Array.from(answer, () => POSITION_NOTINANY).join(''));
    }
    else {
        let response = '';
        query.guess = query.guess.toLocaleLowerCase();
        for (let i = 0; i < answer.length; ++i) {
            if (answer[i] === query.guess[i]) {
                response += POSITION_CORRECT;
            }
            else if (Array.from(response).includes(query.guess[i])) {
                response += POSITION_INCORRECT;
            }
            else {
                response += POSITION_NOTINANY;
            }
        }
        res.json(response);
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});
