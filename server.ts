import http from 'http';
import { app} from './app';


export const server = http.createServer(app);

(async () => {
    server.listen(3001, () => {
        console.log(`Server is running on port ${3001}`);
    });
})()

