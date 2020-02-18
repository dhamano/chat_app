require('dotenv').config();

const port = process.env.PORT || 8000;
const wsPort = process.env.PORT || 1337;

server.listen(port, () => console.log(`\n*** API running on port ${port} ***\n`));

