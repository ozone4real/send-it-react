import express from 'express';
import path from 'path';

const app = express();

const port = process.env.PORT || 3000;

// __dirname = /
// react  app
// resolve = /dist
app.use(express.static(path.resolve(__dirname, 'dist')));

// handling react router, for request to react app
// join = /dist/index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => console.log('server running at port', port));

export default app;
