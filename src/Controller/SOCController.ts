import { Request, Response } from "express";
import { evDataModel } from "../Model/evDataModel";
import socAlgo from "../SOCAlgorithm/SOCAlgo";
class SOCController {
    getSOC(req: Request, res: Response) {
        const evData = new evDataModel(req.body.ladenWeight, req.body.hillyDistance, req.body.highwayDistance,
            req.body.cityDistance, req.body.initialSOC, req.body.totalBatteryCapacity);
        const response = socAlgo.execute(evData);
        res.status(200).send(response);
    }
}
const socController = new SOCController();
export default socController;
