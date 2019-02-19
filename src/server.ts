import 'dotenv/config';
import app from './app';
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Express Typescript server listening on port ${PORT}`);
});
