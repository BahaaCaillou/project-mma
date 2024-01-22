import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { auth } from '../auth/auth';


const Admin = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editImage, setEditImage] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/admin`, { headers: auth() });
        setArticles(response.data);

      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/delete-post/${id}`, { headers: auth() });
      const updatedArticles = articles.filter((article) => article._id !== id);
      setArticles(updatedArticles);
      setMessage('Article supprimé avec succès.');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    // Si un fichier est sélectionné, l'ajouter au formData
    if (e.target.image.files[0]) {
      formData.append('image', e.target.image.files[0]);
    }

    // Sinon, si un lien d'image est saisi, l'ajouter au formData
    if (image) {
      formData.append('images', image);
    }

    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);

    try {
      await axios.post(`${process.env.REACT_APP_API}/submit-post`, formData, { headers: auth() }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const response = await axios.get(`${process.env.REACT_APP_API}/admin`, { headers: auth() });
      setArticles(response.data);
      // Réinitialiser les valeurs après l'ajout
      setImage('');
      setTitle('');
      setDescription('');
      setCategory('');
      setImage('');
      setMessage('Article ajouté avec succès.');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };


  const handleEdit = (article) => {
    setIsEditing(true);
    setEditId(article._id);
    setEditTitle(article.title);
    setEditDescription(article.description);
    setEditCategory(article.category);
    setEditImage(article.image);

  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API}/update-post/${editId}`, { headers: auth() }, {
        title: editTitle,
        description: editDescription,
        category: editCategory,
        image: editImage,
      });
      const response = await axios.get(`${process.env.REACT_APP_API}/admin`, { headers: auth() });
      setArticles(response.data);
      setIsEditing(false);
      setEditId('');
      setEditTitle('');
      setEditDescription('');
      setEditCategory('');
      setEditImage('');
      setMessage('Article mis à jour avec succès.');
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };


  return (
    <div>
      <NavLink className="admin-navbar" to="/admin-equipement">Equipements</NavLink>
      <div className="admin-container">
        

        {isEditing ? (
          <form encType="multipart/form-data" className="form-container-admin" onSubmit={handleUpdate} role="form">
          <label htmlFor="titre">Titre</label>
            <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Title" />
          <label htmlFor="description">Description</label>
          <input type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Description" />
          <label htmlFor="categorie">Categorie</label>
            <input type="text" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} placeholder="Category" />
            <label htmlFor="image">Image</label>
            <input type="text" value={editImage} onChange={(e) => setEditImage(e.target.value)} placeholder="Image URL" />
            <input type="file" name="image" />
            <button type="submit">Update</button>
          </form>
        ) : (

          <form encType="multipart/form-data" className="form-container-admin" onSubmit={handleSubmit} role="form">
            <label htmlFor="titre">Titre</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <label htmlFor="description">Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <label htmlFor="categorie">Categorie</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
            <label htmlFor="image">Image</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
            <p>Ou télécharge ton fichier </p>
            <input type="file" name="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
            <button type="submit">Add</button>
          </form>
        )}
        {message && <p>{message}</p>}
        <h3>Articles</h3>

        

        {articles[0] && (

          

          articles.map((article, i) => (
            article.images[0] && (
                  <div key={article._id} className="article-card-admin" >
                    <h3 className="article-title-admin">{article.title}</h3>
                    <p className="article-description-admin">{article.description}</p>
                    <p className="article-category-admin">{article.category}</p>
                    <div>
                      <img className="article-image-container-admin" src={`${process.env.REACT_APP_API}/img/${article.images[0].src}`} alt={article.images[0].alt} />
                    </div>
                    <button className="edit-button-admin" onClick={() => handleEdit(article)} aria-label={`Editer l'article ${article.title}`}>Editer</button>
                    <button className="delete-button-admin" onClick={() => handleDelete(article._id)} aria-label={`Supprimer l'article ${article.title}`}>Delete</button>
                  </div>
            ))
          ))}

      </div></div>
  );
};

export default Admin;