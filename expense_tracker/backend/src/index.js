const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'https://spendwise-ten.vercel.app' })); // Updated origin

// Other middleware and routes...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});