import React, { Component } from "react";
import { useState, useEffect, useContext } from 'react';
import { useDebounce } from 'use-debounce';
import { pokeContext } from "../../../context/pokeContext";
import "./Home.css";
import Pokedex from '../Search/Pokedex/Pokedex';
import axios from 'axios';


const Home = () => {
  const { home, setHome } = useContext(pokeContext);//Hook para if else en Card
  const { url, setUrl } = useContext(pokeContext);//Hook para almacenar la siguiente paginacion
  const { pokeList, setPokeList } = useContext(pokeContext);

  setHome(true);//Para mostrar una Card u otra

  const getPokemon = async () => {
    try {
      const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10");
      const next = data.next;//Siguiente paginacion de 10
      setUrl(next);//Hook para almacenar la siguiente paginacion
      setPokeList(data.results);

    } catch (error) {
      console.log(error);
    }
  }

  const getPokemonNext = async () => {
    try {
      const { data } = await axios.get(url);
      const next = data.next;
      setUrl(next);
      setPokeList(data.results);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPokemon()//Lanzamos la busqueda de esa entrada
  }, []
  );

  return (
    <div>
      <h1>Welcome to the best Pokemon APP!!</h1>
      <div className="user">
        <h2>Listado de todos los Pokemon existentes</h2>
        <section>
          <Pokedex />
        </section>
        <button onClick={getPokemonNext}>Siguiente</button>
      </div>
    </div>
  )
}

export default Home;
