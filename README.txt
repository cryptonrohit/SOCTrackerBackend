Requirement: EV

Input from user:
    1. estimated distance to be travelled (optional)
    2. Laden weight at the starting of the vehicle from point A.
    3. Initial SOC    
    
Paramater for algorithm:
    Laden weight(ton)
    elevation(degree)
    distance to be travelled(km)
    downhill with regenartive breaking(+SOC)
    
    
algo SOC = weight+ elevation + distance to be travelled - downhill
SOC remaining = initial SOC - algo SOC

Input- 
GET/api
{
    "LadenWeight" : "100",
    "InitialSoC" : "10",
    "Odometer" : "1500",
    "DistanceToCover" : "200",
    "UphilllDistance" : "20",
    "DownhillDistance": "40",
    "BatteryCapacity":"50000",
    "SnowDistance": "5",
    "BatteryType" : "AC/DC"
}

Output- 
{
    "EstimatedFinalSoC" : ""
    //"DistanceCanBetravelled" : ""
}

Input which will be provided By user 
1.LadenWeight
2.DistanceToCover
    a.Hardcoded value
    b.From Mapbox API - (Need work)

Input we have to call some Map API-

1.UphilllDistance
2.DownhillDistance
3.SnowDistance 

Input which we can get from VDV -

2.InitialSoC
3.Odometer 
4.BatteryPower  
------------------------------------------------------------
DrivingFactors- 

1.UphilllDistance -1 Km > x' = 11

2.DownhillDistance-1Km  > 2Kw = 11
    AVERAGE POWER CONSUMED = 0.10kWh
    Combining uphill and downhill total hilly distance average power consumption is  = .10 kWh
    This means for 1 km to travel through uphill and downhill together 0.10 kWh of energy is consumed.
    Also in this the regenartive breaking is considered as it negates the enrgy consumed.

3.SnowDistance    -1km  > 5Kw = 11

4.UphilllDistance+
SnowDistance-      1km> 10Kw - 1/10

5.Highway           1 Km > 1Kw -1
    AVERAGE POwER CONSUMED = 0.11kWh

7. City            1 Km > 1Kw -1
    AVERAGE POwER CONSUMED = 0.12kWh

6. Weight          10+11

PowerRequired = DistanceToeTravelled*DrivingFactors(a+b+c+d+e) 

Battery type

highway
0.1139150943396226+0.1186274509803922+0.1341013824884793+0.1471343873517787+0.1527932960893855+0.1307759372275501
0.112

average = .11 i.e 1Km it will take .11KwH

City
0.1210526315789474+0.1269230769230769+0.1028301886792453
average = .12


Hilly 
0.10454545
0.10727273
0.1009727273

Average= .10



CALCULATIONS:
Now if a EV vehicle has to travel total of 78km.
Input from user:
{
    "totalDistance": 135,
    "hillyDistance": 20,    //0.10 kWh
    "highwayDistance": 50,  //0.11 kWh
    "cityDistance": 65,     //0.12 kWh
    "initialSOC": 40,
    "availableBatteryCapacity": 32.6
}

const ResersveSoC= 10


hillyPowerConsumed = 0.10 * 20    //2kWh
highwayPowerConsumed = 0.11 * 50  //5.5kWh
cityPowerConsumed = 0.12 * 65     //7.8kWh

totalPowerConsumed = hillyPowerConsumed + highwayPowerConsumed + cityPowerConsumed //15.3kWh
remainingBatteryCapacity = availableBatteryCapacity - totalPowerConsumed  //17.3kWh

In 100 SoC battery capacity is 32.6,so with  1% charge EV will provide= 
SoCperBatteryCapacity = 100/availableBatteryCapacity   //3.06%
 

In order to complete his journey of 135 km , vehicle needs 15.2kwh of energy so 
SoC needed = totalPowerConsumed * SoCperCharge //46.8 ~ 47%

SoCRequired = (InitialSoC + ResersveSoC)-SoC needed 
OUTPUT:
{
    "SoCRequired" : "13",
    "Message" : "Considering 10Percent of SoC for Reserve"
}

// Amazon 
// Warehouse to Warehouse 