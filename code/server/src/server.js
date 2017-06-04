const app = require('./app');
const port = process.env.SERVER_PORT || 7000;

app.listen(port, () => {
    console.log(`  📞    Greeting API Server listening on port ${port}`);
});

