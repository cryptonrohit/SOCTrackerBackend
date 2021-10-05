import { evDataModel } from "../Model/evDataModel";
import { outputMessage } from "../Model/outputMessage";
import { terrainWeightPowerRatio } from "../Model/powerRatioModel";

class SOCAlgo {
    execute(data: evDataModel) {
        const {ladenWeight, hillyDistance, highwayDistance, cityDistance, initialSOC, totalBatteryCapacity} = data;
        const reserveSOC = 10;

        // Terrain wise power consumed
        const hillyPowerConsumed = terrainWeightPowerRatio.hillyToPowerToWeightRatio * hillyDistance * ladenWeight;
        const highwayPowerConsumed = terrainWeightPowerRatio.highwayToPowerToWeightRatio * highwayDistance * ladenWeight;
        const cityPowerConsumed = terrainWeightPowerRatio.cityToPowerToWeightRatio * cityDistance * ladenWeight;

        // Required battery capacity to cover the distance
        const totalPowerToBeConsumed = hillyPowerConsumed + highwayPowerConsumed + cityPowerConsumed;

        // Here we are calculating SOC we will get per kWh.
        const socRequiredForJourney = Math.floor((100/totalBatteryCapacity) * totalPowerToBeConsumed);
        const socRequired = (socRequiredForJourney + reserveSOC) - initialSOC;
        if (socRequired <= 0) {
            return outputMessage.alreadyCharged;
        }
        if (socRequired > 100) {
            return `${outputMessage.fullChargeTimes} ${Math.floor(socRequired/100)} times ${outputMessage.followUpCharge} ${Math.floor(socRequired%100)}`;
        }
        return `${outputMessage.requireCharge} ${Math.floor(socRequired)}`;
    }
}
const socAlgo = new SOCAlgo();
export default socAlgo;
