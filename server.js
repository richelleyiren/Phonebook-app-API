const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const PORT = 4000;


const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods:'GET,POST,PUT,DELETE'
  })
);

let contacts = [];

// add contact
app.post("/add-contact", (req, res) => {
  try {
    const { cName, cNumber } = req.body;

    if ((cName, cNumber)) {
      const newContact = {
        id: uuidv4(),
        name: cName,
        number: cNumber,
        favorite: false,
      };
      contacts.push(newContact);
      console.log(contacts);
      res.status(200).json(newContact);
    }
  } catch (error) {
    console.log(error);
  }
});

// get all contacts
app.get("/get-contacts", (req, res) => {
  try {
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
  }
});

//add to favorites
//updating
app.put("/favorite/:id", (req, res) => {
  const { id } = req.params;
  //finding match


  
  //updating the task
contacts = contacts.map((contact) => {
          return contact.id === id ? {...contact, favorite:!contact.favorite} :{...contact}
      })
  
        const findContact = contacts.find((cont) => cont.id === id);

  res.status(200).json(findContact);
// res.status(200).json({ message: "haha" });
});

//deleting contact

app.delete('/delete/:id', (req,res)=>{
    const {id} = req.params

  const findContact = contacts.find((cont) => cont.id === id);

  contacts = contacts.filter( (cont) => cont.id !== id)

 

   res.status(200).json(findContact)
})

app.listen(PORT, () => {
  console.log(`listing on ${PORT}`);
});
