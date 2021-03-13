const express = require("express");
const bodyParser = require("body-parser");
const Axios  = require("axios");
``
const app = express();

let distance = 0 ;
const pp=94.22;
const dp=86.37;
let time = 0;
app.use(bodyParser.json());

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}

const coordinates = [];
const api_key="5b3ce3597851110001cf62480ea60abd2df64b34940b1ad1aabcc95a";

const  getsearch = async (place)=>{
   await Axios.get(`https://api.openrouteservice.org/geocode/search?api_key=${api_key}&text=${place}&boundary.country=IN&size=1`)
    .then(res=>coordinates.push(res.data.features[0].geometry.coordinates))
    .catch(err=>console.log(err))
}



const clacultateDistance  = async (coordinates)=>{
    const api = "5b3ce3597851110001cf62480ea60abd2df64b34940b1ad1aabcc95a";
    while(!coordinates){
        console.log("waitnig for lat long ");
    }
    await Axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${api_key}&start=${coordinates[0]}&end=${coordinates[1]}`)
    .then(res=>{ distance = res.data.features[0].properties.segments[0].distance;
        time = res.data.features[0].properties.segments[0].duration;

    })

}

app.get("/",(req,res)=>{
    res.send("hello")
})


app.post("/search",(req,res)=>{
    const start = req.body.start;
    const end = req.body.end;
    const mode = req.body.mode;
   getsearch(start)
   getsearch(end)
   setTimeout(()=>{
    clacultateDistance(coordinates)
},2000)
    setTimeout(() => {
        res.send({total_distance: Math.round(distance/1000)+" kms",
        time_taken:secondsToHms(time)})
    }, 5000);

})


app.get("/bike",(req,res)=>{
        res.send({
            mode:"bike",
            total_distance:Math.round((distance/1000))+" kms",
            fuel_cost:"₹"+Math.round((distance*(pp/40))/1000),
            carbon_emissions:(0.05*distance/1000).toFixed(2)+" kg",
            evcar_charge:"₹"+Math.round((distance*0.72)/1000),
            evcar_carbon_emissions_usage:(0.033*distance/1000).toFixed(2)+" kg",
            evcar_carbon_emission_production:6200+" kg",
            evbike_charge:"₹"+Math.round((distance*0.19)/1000),
            evbike_carbon_emissions:(0.016*distance/1000).toFixed(2)+" kg",
            evbike_carbon_emission_production:500+" kg",
            BMTC_charge:"₹"+Math.round((distance)/1000),
            BMTC_carbon_emissions:((0.016*distance/1000).toFixed(2))+" kg"

        })
  
})

app.get("/smallpetrol",(req,res)=>{
    res.send({
        mode:"small petrol car",
        total_distance:Math.round((distance/1000))+" kms",
        fuel_cost:"₹"+Math.round((distance*(pp/19))/1000),
        carbon_emissions:Math.round((0.17*distance/1000))+" kg",
        evcar_charge:"₹"+Math.round((distance*0.72)/1000),
            evcar_carbon_emissions_usage:(0.033*distance/1000).toFixed(2)+" kg",
            evcar_carbon_emission_production:6200+" kg",
            evbike_charge:"₹"+Math.round((distance*0.19)/1000),
            evbike_carbon_emissions:(0.016*distance/1000).toFixed(2)+" kg",
            evbike_carbon_emission_production:500+" kg",
            BMTC_charge:"₹"+Math.round((distance)/1000),
            BMTC_carbon_emissions:((0.016*distance/1000).toFixed(2))+" kg"
    })
});

app.get("/mediumpetrol",(req,res)=>{
    res.send({
        mode:"medium petrol car",
        total_distance:Math.round((distance/1000))+" kms",
        fuel_cost:"₹"+Math.round((distance*(pp/12))/1000),
        carbon_emissions:Math.round((0.22*distance/1000))+" kg",
        evcar_charge:"₹"+Math.round((distance*0.72)/1000),
            evcar_carbon_emissions_usage:(0.033*distance/1000).toFixed(2)+" kg",
            evcar_carbon_emission_production:6200+" kg",
            evbike_charge:"₹"+Math.round((distance*0.19)/1000),
            evbike_carbon_emissions:(0.016*distance/1000).toFixed(2)+" kg",
            evbike_carbon_emission_production:500+" kg",
            BMTC_charge:"₹"+Math.round((distance)/1000),
            BMTC_carbon_emissions:((0.016*distance/1000).toFixed(2))+" kg"
    })


});

app.get("/largepetrol",(req,res)=>{
    res.send({
        mode:"large petrol car",
        total_distance:Math.round((distance/1000))+" kms", 

        fuel_cost:"₹"+Math.round((distance*(pp/7))/1000),
        carbon_emissions:Math.round((0.27*distance/1000))+" kg",
        evcar_charge:"₹"+Math.round((distance*0.72)/1000),
            evcar_carbon_emissions_usage:(0.033*distance/1000).toFixed(2)+" kg",
            evcar_carbon_emission_production:6200+" kg",
            evbike_charge:"₹"+Math.round((distance*0.19)/1000),
            evbike_carbon_emissions:(0.016*distance/1000).toFixed(2)+" kg",
            evbike_carbon_emission_production:500+" kg",
            BMTC_charge:"₹"+Math.round((distance)/1000),
            BMTC_carbon_emissions:((0.016*distance/1000).toFixed(2))+" kg"
    })


});

app.get("/averagepetrol",(req,res)=>{
    res.send({
        mode:"average petrol car",
        total_distance:Math.round((distance/1000))+" kms",
        fuel_cost:"₹"+Math.round((distance*(pp/13))/1000),
        carbon_emissions:Math.round((0.20*distance/1000))+" kg",
        evcar_charge:"₹"+Math.round((distance*0.72)/1000),
            evcar_carbon_emissions_usage:(0.033*distance/1000).toFixed(2)+" kg",
            evcar_carbon_emission_production:6200+" kg",
            evbike_charge:"₹"+Math.round((distance*0.19)/1000),
            evbike_carbon_emissions:(0.016*distance/1000).toFixed(2)+" kg",
            evbike_carbon_emission_production:500+" kg",
            BMTC_charge:"₹"+Math.round((distance)/1000),
            BMTC_carbon_emissions:((0.016*distance/1000).toFixed(2))+" kg"
    })


});


app.get("/smalldiesel",(req,res)=>{
    res.send({
        mode:"small diesel car",
        total_distance:Math.round((distance/1000))+" kms",
        fuel_cost:"₹"+Math.round((distance*(dp/15))/1000),
        carbon_emissions:Math.round((0.12*distance/1000))+" kg",
        evcar_charge:"₹"+Math.round((distance*0.72)/1000),
            evcar_carbon_emissions_usage:(0.033*distance/1000).toFixed(2)+" kg",
            evcar_carbon_emission_production:6200+" kg",
            evbike_charge:"₹"+Math.round((distance*0.19)/1000),
            evbike_carbon_emissions:(0.016*distance/1000).toFixed(2)+" kg",
            evbike_carbon_emission_production:500+" kg",
            BMTC_charge:"₹"+Math.round((distance)/1000),
            BMTC_carbon_emissions:((0.016*distance/1000).toFixed(2))+" kg"
    })


});

app.get("/averagediesel",(req,res)=>{
    res.send({
        mode:"average diesel car",
        total_distance:Math.round((distance/1000))+" kms",
        fuel_cost:"₹"+Math.round((distance*(dp/12))/1000),
        carbon_emissions:Math.round((0.12*distance/1000))+" kg",
        evcar_charge:"₹"+Math.round((distance*0.72)/1000),
            evcar_carbon_emissions_usage:(0.033*distance/1000).toFixed(2)+" kg",
            evcar_carbon_emission_production:6200+" kg",
            evbike_charge:"₹"+Math.round((distance*0.19)/1000),
            evbike_carbon_emissions:(0.016*distance/1000).toFixed(2)+" kg",
            evbike_carbon_emission_production:500+" kg",
            BMTC_charge:"₹"+Math.round((distance)/1000),
            BMTC_carbon_emissions:((0.016*distance/1000).toFixed(2))+" kg"

    })


});
app.get("/largediesel",(req,res)=>{
    res.send({
        mode:"large diesel car",
        total_distance:Math.round((distance/1000))+" kms",
        fuel_cost:"₹"+Math.round((distance*(dp/9))/1000),
        carbon_emissions:Math.round((0.14*distance/1000))+" kg",
        evcar_charge:"₹"+Math.round((distance*0.72)/1000),
            evcar_carbon_emissions_usage:(0.033*distance/1000).toFixed(2)+" kg",
            evcar_carbon_emission_production:6200+" kg",
            evbike_charge:"₹"+Math.round((distance*0.19)/1000),
            evbike_carbon_emissions:(0.016*distance/1000).toFixed(2)+" kg",
            evbike_carbon_emission_production:500+" kg",
            BMTC_charge:"₹"+Math.round((distance)/1000),
            BMTC_carbon_emissions:((0.016*distance/1000).toFixed(2))+" kg"
    })


});

app.get("/evcar",(req,res)=>{
    res.send({
        mode:"electric car",
        total_distance:Math.round((distance/1000))+" kms",
        charge:"₹"+Math.round((distance*0.72)/1000),
        carbon_emissions_usage:(0.033*distance/1000).toFixed(2)+" kg",
        carbon_emission_production:6200+" kg",
        

    })

``
});

app.get("/evbike",(req,res)=>{
    res.send({
        mode:"electric bike",
        total_distance:Math.round((distance/1000))+" kms",
        charge:"₹"+Math.round((distance*0.19)/1000),
        carbon_emissions:((0.016*distance/1000)).toFixed(2)+" kg",
        carbon_emission_production:500+" kg"
    })


});

app.get("/bmtc",(req,res)=>{
    res.send({
        mode:"public transport bmtc",
        total_distance:Math.round((distance/1000))+" kms",
        charge:"₹"+Math.round((distance)/1000),
        carbon_emissions:((0.016*distance/1000).toFixed(2))+" kg"
    })


});



app.listen("5000",()=>{
    console.log("server started on port 5000")
});