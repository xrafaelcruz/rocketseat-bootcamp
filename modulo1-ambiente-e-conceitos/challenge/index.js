const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
let numberOfRequests = 0;

server.use((req, res, next) => {
  numberOfRequests++;
  console.log("Requests:" + numberOfRequests);
  console.log(req.method, req.url);
  next();
});

const checkProject = (req, res, next) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "id is required!" });
  } else if (!projects[id]) {
    return res.status(404).json({ error: "Project not found!" });
  }

  return next();
};

const checkProjectExists = (req, res, next) => {
  const { id } = req.body;

  if (projects[id]) {
    return res.status(401).json({ error: "Project already exists!" });
  }

  return next();
};

server.post("/projects", checkProjectExists, (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkProject, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  projects[id].tasks.push(title);

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", checkProject, (req, res) => {
  const { id } = req.params;

  return res.json(projects[id]);
});

server.put("/projects/:id", checkProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].title = title;

  return res.json(projects);
});

server.delete("/projects/:id", checkProject, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.send();
});

server.listen(3000);
