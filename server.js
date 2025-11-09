const express = require('express');
const cors = require('cors');
const multer = require('multer');
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
        "length_cm": "8 cm",
        "price": "35.00",
        "info": "The Royal Gramma is a hardy and vividly colored reef fish featuring a purple-to-yellow gradient body. It’s peaceful, easy to care for, and perfect for beginner saltwater hobbyists.",
        "image": "images/royal-gramma.png"
    },
    {
        "_id": 3,
        "name": "Mandarin Dragonet",
        "species": "Synchiropus splendidus",
        "region": "saltwater",
        "length_cm": "7 cm",
        "price": "80.00",
        "info": "The Mandarin Dragonet is prized for its psychedelic blue, green, and orange patterns. It is peaceful and small but requires a well-established tank with plenty of live copepods.",
        "image": "images/mandarin-dragonet.png"
    },
    {
        "_id": 4,
        "name": "Ram Cichlid",
        "species": "Mikrogeophagus ramirezi",
        "region": "freshwater",
        "length_cm": "6 cm",
        "price": "25.00",
        "info": "The Electric Blue Ram is a striking freshwater cichlid known for its iridescent blue body and peaceful temperament. It thrives in planted community tanks with soft, warm water.",
        "image": "images/ram-cichlid.png"
    },
    {
        "_id": 5,
        "name": "Clownfish",
        "species": "Amphiprion ocellaris",
        "region": "saltwater",
        "length_cm": "9 cm",
        "price": "30.00",
        "info": "Made famous by its bright orange and white stripes, the Clownfish is hardy, social, and forms symbiotic relationships with anemones, making it a favorite among marine hobbyists.",
        "image": "images/clownfish.png"
    },
    {
        "_id": 6,
        "name": "Dwarf Cichlid",
        "species": "Apistogramma agassizii",
        "region": "freshwater",
        "length_cm": "7 cm",
        "price": "20.00",
        "info": "This dwarf cichlid from the Amazon Basin displays shimmering blue and yellow hues. It’s ideal for planted tanks and known for its intelligent, curious behavior.",
        "image": "images/dwarf-cichlid.png"
    },
    {
        "_id": 7,
        "name": "Bangaii Cardinalfish",
        "species": "Pterapogon kauderni",
        "region": "saltwater",
        "length_cm": "8 cm",
        "price": "40.00",
        "info": "The Bangaii Cardinalfish is a peaceful, slow-swimming reef species with bold black-and-silver stripes. It is easy to breed in captivity and great for small community aquariums.",
        "image": "images/cardinalfish.png"
    },
    {
        "_id": 8,
        "name": "Boesemani Rainbowfish",
        "species": "Melanotaenia boesemani",
        "region": "freshwater",
        "length_cm": "10 cm",
        "price": "18.00",
        "info": "The Boesemani Rainbowfish is a freshwater favorite known for its split coloration—blue in the front and orange in the rear. It’s active, hardy, and a great centerpiece for planted tanks.",
        "image": "images/rainbowfish.png"
    }
];


app.get("/api/fishes", (req, res) => {
    console.log("Fish Requested");
    res.send(fishes);
}); 


app.get("/api/fish/:id", (req, res) => {
    const fish = fishes.find((fish) => fish._id == parseInt(req.params.id));
    res.send(fish);
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => console.log(`Running on port ${PORT}`));
