import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button, makeStyles, Card, AppBar, Toolbar, LinearProgress,  } from "@material-ui/core";
import axios from "axios";
import WebFont from 'webfontloader';
WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'Bangers', 'Balsamiq Sana']
  }
});

const useStyle = makeStyles((theme) => ({
    root: {

    },
    topbar: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },  
    cardStyle: {
        margin: "50px",
        padding: "30px",
        background: "#dfefef",
    },
    info: {
      paddingLeft: "50px",
    }

}));


const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);
  const classes = useStyle();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites, base_experience } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (

      <Card className={classes.cardStyle} style={{display: "flex", flexDirectio: "row"}}>
        <div>
            <Typography variant="h1" style={{fontFamily: "Bangers", color: "#e39533"}}>
              {`${id}.`} {name}
              <img src={front_default} />
            </Typography>
            <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
        </div>

        <div className={classes.info}>
        <Typography variant="h4" style={{}}>Pokemon Info: </Typography>
        <Typography variant="h6">
          {"Species: "}
          <Link href={species.url}>{species.name} </Link>
        </Typography>
        <Typography variant="h6">Height: {height} </Typography>
        <Typography variant="h6">Weight: {weight} </Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography key={name} variant= "h6" > Types: {`${name}`}</Typography>;
        })}
            <Typography variant="h6">Base Experience: </Typography>
            <LinearProgress  variant="determinate" value={40}/>
        </div>
      </Card>
    );
  };
  return (
    <>
    <AppBar position="static" className={classes.topbar}>
        <Toolbar style={{display: "flex", justifyContent:"space-between"}}>
        <Typography style={{fontFamily: "Bangers", margin: "10px"}} variant="h3">
          Fetch-Em-All
        </Typography>
        </Toolbar>
      </AppBar>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}
      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")}>
          back to pokedex
        </Button>
      )}
    </>
  );
};
export default Pokemon;