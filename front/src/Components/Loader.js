import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loader = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Remplacez ceci par votre fonction de chargement de données
      const fetchData = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simule un délai de chargement de 2 secondes
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
};

export default Loader;