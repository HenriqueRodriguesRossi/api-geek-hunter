const express = require("express");
const app = express();
require("dotenv").config();
require("./db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CandidatesRouter = require("./router/CandidatesRouter");
app.use(CandidatesRouter);

const CompanyRouter = require("./router/CompanyRouter");
app.use(CompanyRouter);

const JobsRouter = require("./router/JobsRouter");
app.use(JobsRouter);

app.listen(8080, () => {
  console.log("The server is running on port 8080");
});
