import React from 'react';
import { Character, GetCharacterResults } from '../../../types';


// "The actual function"
export default function CharacterPage({character}:{character: Character}){
    return <div>
        <h1>{character.name}</h1>
        Character Page
    </div>
};





export async function getStaticPaths() {
    const resPath = await fetch("https://rickandmortyapi.com/api/character");
    const { results }: GetCharacterResults = await resPath.json();

    return {
        paths: results.map((character) => {
            return {
                params: {id: String(character.id)}
            }
        }), fallback: false
    }
};




export async function getStaticProps( {params}: {params: { id: string }} ) {
    const resStatic = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);

    const character = await resStatic.json();

    return {
        props: {
            character
        }
    }
};

