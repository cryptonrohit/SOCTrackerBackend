import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 6545;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});

import socController from "./Controller/SOCController";
app.get("/calculate/SOC", socController.getSOC);
