import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Character } from '../../../types';


// "The actual function"
export default function CharacterPage({character}:{character: Character}){

    const router = useRouter()

    // console.log(router.query.id)

    return <div>
        <h1>{character.name}</h1>
       <p>Character Page!</p> 
    </div>
};



export const getServerSideProps: GetServerSideProps = async (context) => {

    const resStatic = await fetch(`https://rickandmortyapi.com/api/character/${context.query.id}`);

    const character = await resStatic.json();

    return {
        props: {
            character
        }
    }
};

