import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../auth/auth';


const DetailArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [pseudo, setPseudo] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('')
  const user = JSON.parse(localStorage.getItem("user"))

  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/detail/${id}`);
        const data = response.data;
        setArticle(data);
        setComments(data.comments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [id]);
  
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


  const handleAddComment = async (event) => {
    event.preventDefault();

    if (comment.trim() === '') {
      setErrorMessage('Comment cannot be empty');
      return;
    }
    setErrorMessage('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/comments/${id}`,  {
        pseudo: user.login,
        comment
       
      }, { headers: auth() }); 
      setComments(response.data.comments);
   
      setComment('');
      setPseudo('')
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <>
      <section className="article-container">
        {article.images &&
          article.images.map((image, index) => (
            <article key={index} className="article-id" role="article">
              <h3 aria-label={article.title}>{article.title}</h3>
              <img  src={`${process.env.REACT_APP_API}/img/${article.images[0].src}`} alt={article.title} />
              <p>{article.description}</p>
            </article>
          ))}
      </section>

      <section className="comment-section">
        <h2>&nbsp;&nbsp;&nbsp;Commentaires&nbsp;</h2>
        <div className="comment-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <h4>{comment.pseudo}</h4>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
        {user ? (
          <div className="comment-container">
        <form role="form" onSubmit={handleAddComment} className="comment-section">
          
          <h3>{user.login}</h3>
          
          <textarea
            placeholder="Your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="comment-textarea"
          />
           {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="comment-button">Add Comment</button>
        </form>
        </div>) : ( <p>Vous devez être connecté pour poster un commentaire</p>)}
      </section>
    </>
  );
};

export default DetailArticle;