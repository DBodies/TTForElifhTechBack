import { initMongoConnection } from './db/initMongoConntection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
    await initMongoConnection();
    setupServer();
};

void bootstrap();