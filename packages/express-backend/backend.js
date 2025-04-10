import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

  const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
  };

  const findUserByJob = (job) => {
    return users["users_list"].filter(
        (user) => user["job"] === job
    );
  };
  
  const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

  const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };

  const removeUser = (user) => {

    users["users_list"].pop(user);
    return user;
  };
  
  app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });

  app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result = users["users_list"];
    if (name != undefined && job != undefined) {
      result = findUserByName(name).filter((user) => user["job"] === job); // use helper method to filter by name then use .filter to filter by job
    } 
    else if (name != undefined) {
      result = findUserByName(name);
    }
    else if(job != undefined){
      result = findUserByJob(job);
    }
    res.send({users_list: result})
  });
  
  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
  });

  app.delete("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let userToRemove = findUserById(id);
    if (userToRemove === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      removeUser(userToRemove);
      res.send();
    }
  });