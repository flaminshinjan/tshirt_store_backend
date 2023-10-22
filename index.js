const express = require('express');
const app = express();
const port = 8080;

let tshirts = [
  { id: 1, size: 'large', logo: '🌟' },
  { id: 2, size: 'medium', logo: '🚀' }
];

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  

  app.get('/tshirts', (req, res) => {
    res.status(200).send(tshirts);
  });
  

  app.get('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const tshirt = tshirts.find(t => t.id === parseInt(id));
    if (!tshirt) 
    return res.status(404).send({ message: 'T-shirt not found.' });
    res.status(200).send(tshirt);
  });
  
  app.post('/tshirt', (req, res) => {
    const { size, logo } = req.body;
    if (!size || !logo) return res.status(400).send({ message: 'Size and logo are required.' });
    const newTshirt = {
      id: tshirts.length + 1, 
      size, 
      logo
    };
    tshirts.push(newTshirt);
    res.status(201).send(newTshirt);
  });
  
  app.put('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const { size, logo } = req.body;
    const tshirt = tshirts.find(t => t.id === parseInt(id));
    if (!tshirt) return res.status(404).send({ message: 'T-shirt not found.' });
    tshirt.size = size;
    tshirt.logo = logo;
    res.status(200).send(tshirt);
  });
  
  app.delete('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const index = tshirts.findIndex(t => t.id === parseInt(id));
    if (index === -1) return res.status(404).send({ message: 'T-shirt not found.' });
    const deletedTshirt = tshirts.splice(index, 1);
    res.status(200).send(deletedTshirt[0]);
  });  