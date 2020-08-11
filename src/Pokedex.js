import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  AppBar,
  TextField,
  CardHeader,
  Avatar,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import WebFont from 'webfontloader';
WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'Bangers']
  }
});


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    HighCard: {
        background: "#dfefef"
    },
  pokedexContainer: {
    paddingTop: "100px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  topbar: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  
  niceSearch:{
    display: "flex",
    justifyContent: "center",
    width: "300px",
    height: "60px",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginBottom: "5px",
    backgroundColor: fade(theme.palette.common.white, 0.15),
  },
  niceSearchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
    margin: "5px",
  },
  niceSearchInput: {
    width: "300px",
    marginTop: "20px",
  },

}));

const Pokedex = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=30`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://pokeres.bastionbot.org/images/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Grid item xs={12} sm={4} lg={3} xl={2} key={pokemonId} >
        <Card className={classes.HighCard} onClick={() => history.push(`/${id}`)}>
        <CardHeader avatar={
            <Avatar style={{background: '#f2856d'}}>
              {pokemonId}
            </Avatar>
          }>
          </CardHeader>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ maxWidth: "300px", height: "300px", }}
          />
          <CardContent>
            <Typography variant='h4' style={{fontFamily: 'Bangers', textAlign: 'center'}}>
                {`${name}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <AppBar position="static" className={classes.topbar}>
        <Toolbar style={{display: "flex", justifyContent:"space-between"}}>
        <Typography style={{fontFamily: "Bangers", margin: "10px"}} variant="h3">
          Fetch-Em-All
        </Typography>

        <div className={classes.niceSearch} >
        <SearchIcon className={classes.niceSearchIcon} />
          <TextField
            className={classes.niceSearchInput}
            onChange={handleSearchChange}
            lebel="Pokemon"
            variant="standard" 
          />
      </div>

        </Toolbar>
      </AppBar>

      {pokemonData ? (
        <Grid container spacing={5} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
export default Pokedex;