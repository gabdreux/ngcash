import * as React from 'react';
import type { GetStaticProps, NextPage} from "next";
import Link from 'next/link';
import { Character, GetCharacterResults } from '../../types';



const Index: NextPage<{characters: Character[]}> = ({characters}) => {
   
    return (

      <div>
        {/* <p>
          DB_CONNECT: {process.env.NEXT_PUBLIC_DB_CONNECT}
        </p> */}
        

        {characters.map((character) => { 
          return ( 
            
              <li key={character.id}>
                <Link legacyBehavior href={`/characters/${character.id}`}>
                  <a>
                    {character.name}
                  </a>
                </Link>  
              </li>

              )
            }
          )
        }

      </div>

    )
  
};


// Usado para gerar páginas estáticas
export const getStaticProps: GetStaticProps = async (context) => {
  const resStatic = await fetch("https://rickandmortyapi.com/api/character");
  const {results}: GetCharacterResults = await resStatic.json();

  return {
    props: {
      characters: results,
    },
  };
};



export default Index;