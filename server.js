const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Joi = require('joi');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage: storage});  

const fishes = [
        {
        "_id": 1,
        "name": "Gemmatum Tang",
        "species": "Zebrasoma gemmatum",
        "region": "saltwater",
        "length_cm": "10 cm",
        "price": "45.00",
        "info": "The Gemmatum Tang is a small, colorful fish known for its striking appearance and peaceful nature. It is a popular choice for saltwater aquariums due to its vibrant colors and manageable size.",
        "image": "images/gemmatumtang.png"
    },
    {
        "_id": 2,
        "name": "Royal Gramma",
        "species": "Gramma loreto",
        "region": "saltwater",
        "price": "35.00",
        "description": "The Royal Gramma is a hardy and vividly colored reef fish featuring a purple-to-yellow gradient body. It’s peaceful, easy to care for, and perfect for beginner saltwater hobbyists.",
        "image": "images/royal-gramma.png"
    },
    {
        "_id": 3,
        "name": "Mandarin Dragonet",
        "species": "Synchiropus splendidus",
        "region": "saltwater",
        "price": "80.00",
        "description": "The Mandarin Dragonet is prized for its psychedelic blue, green, and orange patterns. It is peaceful and small but requires a well-established tank with plenty of live copepods.",
        "image": "images/mandarin-dragonet.png"
    },
    {
        "_id": 4,
        "name": "Ram Cichlid",
        "species": "Mikrogeophagus ramirezi",
        "region": "freshwater",
        "price": "25.00",
        "description": "The Electric Blue Ram is a striking freshwater cichlid known for its iridescent blue body and peaceful temperament. It thrives in planted community tanks with soft, warm water.",
        "image": "images/ram-cichlid.png"
    },
    {
        "_id": 5,
        "name": "Clownfish",
        "species": "Amphiprion ocellaris",
        "region": "saltwater",
        "price": "30.00",
        "description": "Made famous by its bright orange and white stripes, the Clownfish is hardy, social, and forms symbiotic relationships with anemones, making it a favorite among marine hobbyists.",
        "image": "images/clownfish.png"
    },
    {
        "_id": 6,
        "name": "Dwarf Cichlid",
        "species": "Apistogramma agassizii",
        "region": "freshwater",
        "price": "20.00",
        "description": "This dwarf cichlid from the Amazon Basin displays shimmering blue and yellow hues. It’s ideal for planted tanks and known for its intelligent, curious behavior.",
        "image": "images/dwarf-cichlid.png"
    },
    {
        "_id": 7,
        "name": "Bangaii Cardinalfish",
        "species": "Pterapogon kauderni",
        "region": "saltwater",
        "price": "40.00",
        "description": "The Bangaii Cardinalfish is a peaceful, slow-swimming reef species with bold black-and-silver stripes. It is easy to breed in captivity and great for small community aquariums.",
        "image": "images/cardinalfish.png"
    },
    {
        "_id": 8,
        "name": "Boesemani Rainbowfish",
        "species": "Melanotaenia boesemani",
        "region": "freshwater",
        "price": "18.00",
        "description": "The Boesemani Rainbowfish is a freshwater favorite known for its split coloration—blue in the front and orange in the rear. It’s active, hardy, and a great centerpiece for planted tanks.",
        "image": "images/rainbowfish.png"
    }
];


app.get("/api/fishes/", (req, res) => {
    console.log("Fish Requested");
    res.send(fishes);
}); 

app.get("/api/fishes/:id", (req, res) => {
    const fish = fishes.find((fish) => fish._id == parseInt(req.params.id));
    res.send(fish);
});

app.post("/api/fishes", upload.single("img"), (req, res) => {
    console.log("in post request");
    const result = validateFish(req.body);

    if(result.error) {
          console.log("Validation error:", result.error.details[0].message);
          console.log("Body received:", req.body);
          return res.status(400).send(result.error.details[0].message);
    }

    const fish = {
        _id: fishes.length + 1,
        name: req.body.name,
        species: req.body.species,
        region: req.body.region,
        price: req.body.price,
        description: req.body.description,
    };

    if(req.file) {
        fish.image = req.file.filename;
    }

    fishes.push(fish);
    res.status(200).send(fish);
});

app.put("/api/fishes/:id", upload.single("img"), (req, res) => {

    const fish = fishes.find((fish) => fish._id == parseInt(req.params.id));

    if(!fish) {
        return res.status(404).send("The fish with the given ID was not found.");
    }

    const isValidUpdate = validateFish(req.body);

    if(isValidUpdate.error) {
        console.log("invalid info");
        res.status(400).send(isValidUpdate.error.details[0].message);
        return;
    }

    fish.name = req.body.name;
    fish.species = req.body.species;
    fish.region = req.body.region;
    fish.price = req.body.price;
    fish.description = req.body.description;

    if(req.file) {
        fish.image = "images/" + req.file.filename;
    }

    res.status(200).send(fish);

});

app.delete("/api/fishes/:id", (req, res) => {
    const fish = fishes.find((fish) => fish._id == parseInt(req.params.id));

    if(!fish) {
        return res.status(404).send("The fish with the given ID was not found.");
    }

    const index = fishes.indexOf(fish);
    fishes.splice(index, 1);
    res.status(200).send(fish);
});


const validateFish = (fish) => {

    const schema = Joi.object({
        _id:Joi.allow(""),
        name:Joi.string().min(3).required(),
        species:Joi.string().min(3).required(),
        region:Joi.string().valid("freshwater", "saltwater").required(),
        price:Joi.number().precision(3).required(),
        description:Joi.string().min(3).required(),
    });

    return schema.validate(fish);
};


app.listen(3001, () => {
    console.log("Server is up and running");
});

