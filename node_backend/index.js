require('dotenv').config();

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n*** API running on port ${port} ***\n`));

