const express=require("express");
const ejs = require('ejs');
const https= require("https");
const bodyParser= require("body-parser");
const { get, request } = require("http");
const { response } = require("express");
const { parse } = require("querystring");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');


var id=471;

app.get('/', (req, res)=>{
    //var index = 1;
    const Helper = [];
    
    var pokemonSearch = "leafeon";
    const url = "https://pokeapi.co/api/v2/pokemon/"+pokemonSearch;
    https.get(url, (response)=>{
        
        response.on("data", (data) =>{
            Helper.push(data);
        });
        response.on("end",()=> {
            try{

                const pokeDataAux = Buffer.concat(Helper);
                const pokeData = JSON.parse(pokeDataAux);
                var pokeImage = pokeData.sprites.other.dream_world.front_default;
                id = pokeData.id;
                var name = pokeData.name;
                var type = pokeData.types;
                var xp = pokeData.base_experience;
                var weight = pokeData.weight;
                var height = pokeData.height;
                var moves = pokeData.moves;
                var abilities = pokeData.abilities;
                
                var ltype=[]
                var lmoves=[]
                var labilities=[]

                if(pokeImage==null){
                    pokeImage=pokeData.sprites.front_default;
                }
                
                for (i=0; i<type.length; i++){
                    ltype.push(pokeData.types[i].type.name)
                };
                
                for (i=0; i<moves.length; i++){
                    lmoves.push(pokeData.moves[i].move.name)
                };
                
                for (i=0; i<abilities.length; i++){
                    labilities.push(pokeData.abilities[i].ability.name)
                };
                
                res.render(__dirname+"/index.html",{
                    name: name, 
                    id:id,
                    types: ltype,
                    xp: xp,
                    weight: weight,
                    height: height,
                    moves: lmoves,
                    abilities: labilities,
                    pokeImg: pokeImage
                });
            }catch (error) {
                res.render("error.html")
            }
            

            
        })
    });
});

app.post('/', (req, res)=>{
    //var index = 1;
    const Helper = [];
    
    var pokemonSearch = req.body.pokeSearch.toLowerCase();
    const url = "https://pokeapi.co/api/v2/pokemon/"+pokemonSearch;
    https.get(url, (response)=>{
        
        response.on("data", (data) =>{
            Helper.push(data);
        });
        response.on("end",()=> {
            try{

                const pokeDataAux = Buffer.concat(Helper);
                const pokeData = JSON.parse(pokeDataAux);
                var pokeImage = pokeData.sprites.other.dream_world.front_default;
                id = pokeData.id;

                var name = pokeData.name;
                var type = pokeData.types;
                var xp = pokeData.base_experience;
                var weight = pokeData.weight;
                var height = pokeData.height;
                var moves = pokeData.moves;
                var abilities = pokeData.abilities;
                
                var ltype=[]
                var lmoves=[]
                var labilities=[]

                if(pokeImage==null){
                    pokeImage=pokeData.sprites.front_default;
                }
                
                for (i=0; i<type.length; i++){
                    ltype.push(pokeData.types[i].type.name)
                };
                
                for (i=0; i<moves.length; i++){
                    lmoves.push(pokeData.moves[i].move.name)
                };
                
                for (i=0; i<abilities.length; i++){
                    labilities.push(pokeData.abilities[i].ability.name)
                };
                
                res.render(__dirname+"/index.html",{
                    name: name, 
                    id:id,
                    types: ltype,
                    xp: xp,
                    weight: weight,
                    height: height,
                    moves: lmoves,
                    abilities: labilities,
                    pokeImg: pokeImage
                });
            }catch (error) {
                res.render("error.html")
                //res.status(400).send('Pokémon not found, please try searching again');
            }
            

            
        })
    });
});

app.post('/next', (req, res)=>{
    //var index = 1;
    const Helper = [];
    if(id===893){
        id=1
    }else{
        id++
    }
    
    var pokemonSearch = id;
    const url = "https://pokeapi.co/api/v2/pokemon/"+pokemonSearch;
    https.get(url, (response)=>{
        
        response.on("data", (data) =>{
            Helper.push(data);
        });
        response.on("end",()=> {
         
            const pokeDataAux = Buffer.concat(Helper);
            const pokeData = JSON.parse(pokeDataAux);
            var pokeImage = pokeData.sprites.other.dream_world.front_default;
            var id = pokeData.id;
            var name = pokeData.name;
            var type = pokeData.types;
            var xp = pokeData.base_experience;
            var weight = pokeData.weight;
            var height = pokeData.height;
            var moves = pokeData.moves;
            var abilities = pokeData.abilities;

            var ltype=[]
            var lmoves=[]
            var labilities=[]

            if(pokeImage==null){
                pokeImage=pokeData.sprites.front_default;
            }
            
            
            for (i=0; i<type.length; i++){
                ltype.push(pokeData.types[i].type.name)
            };
            
            for (i=0; i<moves.length; i++){
                lmoves.push(pokeData.moves[i].move.name)
            };
            
            for (i=0; i<abilities.length; i++){
                labilities.push(pokeData.abilities[i].ability.name)
            };
            
            res.render(__dirname+"/index.html",{
                name: name, 
                id:id,
                types: ltype,
                xp: xp,
                weight: weight,
                height: height,
                moves: lmoves,
                abilities: labilities,
                pokeImg: pokeImage
            });
            
        })
    });
});

app.post('/back', (req, res)=>{
    //var index = 1;
    const Helper = [];
    if(id===1){
        id=893
    }else{
        id--
    }
    
    var pokemonSearch = id;
    const url = "https://pokeapi.co/api/v2/pokemon/"+pokemonSearch;
    https.get(url, (response)=>{
        
        response.on("data", (data) =>{
            Helper.push(data);
        });
        response.on("end",()=> {
         
            const pokeDataAux = Buffer.concat(Helper);
            const pokeData = JSON.parse(pokeDataAux);
            var pokeImage = pokeData.sprites.other.dream_world.front_default;
            var id = pokeData.id;
            var name = pokeData.name;
            var type = pokeData.types;
            var xp = pokeData.base_experience;
            var weight = pokeData.weight;
            var height = pokeData.height;
            var moves = pokeData.moves;
            var abilities = pokeData.abilities;
            
            
            var ltype=[]
            var lmoves=[]
            var labilities=[]

            if(pokeImage==null){
                pokeImage=pokeData.sprites.front_default;
            }
            
            for (i=0; i<type.length; i++){
                ltype.push(pokeData.types[i].type.name)
            };
            
            for (i=0; i<moves.length; i++){
                lmoves.push(pokeData.moves[i].move.name)
            };
            
            for (i=0; i<abilities.length; i++){
                labilities.push(pokeData.abilities[i].ability.name)
            };
            
            res.render(__dirname+"/index.html",{
                name: name, 
                id:id,
                types: ltype,
                xp: xp,
                weight: weight,
                height: height,
                moves: lmoves,
                abilities: labilities,
                pokeImg: pokeImage
            });
            
        })
    });
});



app.listen(3000, ()=>{
    console.log("yesss");
})
