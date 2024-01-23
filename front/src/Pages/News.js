import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../auth/auth';

const News = () => {
    const [article, setArticle] = useState([]);
    const [articlesList, setArticlesList] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API}/news`)
            .then((res) => {
                console.log(res.data)
                const sortedArticles = res.data.sort((a, b) => (b.votes - b.downvotes) - (a.votes - a.downvotes));
                setArticlesList(sortedArticles);
                setArticle(res.data)
            })

    }, [])

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
    };
    // .post(`${process.env.REACT_APP_API}/upvote/${articleId}`)
    const handleUpvote = async (articleId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/upvote/${articleId}`, { headers: auth() }); // Remplacez 'userId' par l'ID de l'utilisateur actuel
            const updatedArticle = response.data;

            // Mettez à jour le state en utilisant la réponse du serveur
            setArticlesList(articlesList.map(article =>
                article._id === updatedArticle._id ? updatedArticle : article
            ));
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDownvote = async (articleId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/downvote/${articleId}`, { headers: auth() }); // Remplacez 'userId' par l'ID de l'utilisateur actuel
            const updatedArticle = response.data;

            // Mettez à jour le state en utilisant la réponse du serveur
            setArticlesList(articlesList.map(article =>
                article._id === updatedArticle._id ? updatedArticle : article
            ));
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>


            {article.map((oneA, i) =>
            (
                // <div className='news-container'>
                <section className="section">
                    <article className="article" role="article">
                        <div className="image-container">
                            <img className="article-image image-news-detail" src={`${process.env.REACT_APP_API}/img/${oneA.images[0].src}`} alt={oneA.title} />
                            <div class="overlay">
                                <h3 className="article-title" aria-label={oneA.title}>{oneA.title}</h3>

                            </div>
                        </div>
                        <p>{`${oneA.description.slice(0, oneA.description.indexOf(" ", 100))}...`}</p>
                        <div className="button-container">
                        <button
                            className="vote-button upvote-button"
                            onClick={() => handleUpvote(oneA._id)}
                        // Remplacez 'userId' par l'ID de l'utilisateur actuel
                        >
                             &#9650; {oneA.votes}
                        </button>
                        <NavLink to={`/detail/${oneA._id}`} className="news-button" activeClassName="nav-button-active">En savoir plus</NavLink>
                        <button
                            className="vote-button downvote-button"
                            onClick={() => handleDownvote(oneA._id)}
                        // Remplacez 'userId' par l'ID de l'utilisateur actuel
                        >
                           &#9660; {oneA.downvotes}
                        </button>
                        </div>
                    </article>
                </section>

            )
            )}


        </>
    );
};

export default News;