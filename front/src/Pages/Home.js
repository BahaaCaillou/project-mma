import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LastArticle from '../Components/LastArticle';
import TrendArticle from '../Components/TrendArticle';
import LastEquipement from '../Components/LastEquipement';
import TrendEquipement from '../Components/TrendEquipement';
import HotEquipement from '../Components/HotEquipement';
import OpenTrivia from '../Components/OpenTrivia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import HotArticle from '../Components/HotArticle';


const Home = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Remplacez ceci par votre fonction de chargement de données
      const fetchData = async () => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simule un délai de chargement de 2 secondes
        setLoading(false);
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return (
        <div className="loader">
             <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      );
    }

    return (
        <>
       
        <main>

        

      

        <div className='home-container'>

            <h1 aria-label="actualités">Quoi de neuf</h1>
            

            

                {/* Section 1 */}
                <LastArticle />

                {/* Section 2 */}
              
                
                <HotArticle />
            
                {/* <OpenTrivia /> */}
                    

                

                {/* Section 3 */}
                <TrendArticle />
                
           



            <h1 aria-label="l'entrainement">L'Entraînement</h1>
            
                {/* Section 1 */}
                
                <LastEquipement />

                {/* Section 2 */}
                
                <HotEquipement />

                {/* Section 3 */}
                <TrendEquipement />
            
        </div>
       
      
        </main>
        
        </>
    );
};

export default Home;