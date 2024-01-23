import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { auth } from '../auth/auth';

const AdminEq = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [affiliateLink, setAffiliateLink] = useState('');

  const [editPrice, setEditPrice] = useState('');
  const [editAffiliateLink, setEditAffiliateLink] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editImage, setEditImage] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/admin-eq`, { headers: auth() });
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/delete-post-eq/${id}`, { headers: auth() });
      const updatedArticles = articles.filter((article) => article._id !== id);
      setArticles(updatedArticles);
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
    formData.append('price', price);
    formData.append('affiliateLink', affiliateLink);
    formData.append('description', description);
    formData.append('category', category);


    try {
      await axios.post(`${process.env.REACT_APP_API}/submit-post-eq`, formData, { headers: auth() }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const response = await axios.get(`${process.env.REACT_APP_API}/admin-eq`);
      setArticles(response.data);
      // Réinitialiser les valeurs après l'ajout
      setPrice('')
      setAffiliateLink('')
      setImage('');
      setTitle('');
      setDescription('');
      setCategory('');
      setImage('');
      window.location.reload();
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
    setEditPrice(article.price)
    setEditAffiliateLink(article.affiliateLink)
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API}/update-post-eq/${editId}`, { headers: auth() }, {
        title: editTitle,
        description: editDescription,
        category: editCategory,
        price: editPrice,
        affiliateLink: editAffiliateLink,
        image: editImage,
      });
      const response = await axios.get(`${process.env.REACT_APP_API}/admin-eq`, { headers: auth() });
      setArticles(response.data);
      setIsEditing(false);
      setEditId('');
      setEditTitle('');
      setEditDescription('');
      setEditCategory('');
      setEditImage('');
      setEditAffiliateLink('');
      setEditAffiliateLink('')
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };


  return (
    <div>
      <NavLink className="admin-navbar" to="/admin">Articles</NavLink>
      <div className="admin-container">

        {isEditing ? (
          <form encType="multipart/form-data" className="form-container-admin" onSubmit={handleUpdate}>
          <label htmlFor="titre">Titre</label>
            <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Title" />
            <label htmlFor="description">Description</label>
            <input type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Description" />
            <label htmlFor="prix">Prix</label>
            <input type="text" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} placeholder="Price" />
            <label htmlFor="lien d'affiliation">Lien d'affiliation</label>
            <input type="text" value={editAffiliateLink} onChange={(e) => setEditAffiliateLink(e.target.value)} placeholder="AffiliateLink" />
            <label htmlFor="categorie">Categorie</label>
            <input type="text" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} placeholder="Category" />
            <label htmlFor="image">Image</label>
            <input type="text" value={editImage} onChange={(e) => setEditImage(e.target.value)} placeholder="Image URL" />
            <input type="file" name="image" />
            <button type="submit">Update</button>
          </form>
        ) : (

          <form encType="multipart/form-data" className="form-container-admin" onSubmit={handleSubmit}>
          <label htmlFor="titre">Titre</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <label htmlFor="description">Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <label htmlFor="prix">Prix</label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
            <label htmlFor="lien d'affiliation">Lien d'affiliation</label>
            <input type="text" value={affiliateLink} onChange={(e) => setAffiliateLink(e.target.value)} placeholder="AffiliateLink" />
            <label htmlFor="categorie">Categorie</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
            <label htmlFor="image">Image</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
            <p>Ou télécharge ton fichier </p>
            <input type="file" name="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
            <button type="submit">Add</button>
          </form>
        )}
        <h3>Articles</h3>
        
               {
  Array.isArray(articles) && articles.map((article, i) => (
    article.images[0] && (
      <div key={article._id} className="article-card-admin">
        <h4 className="article-title-admin">{article.title}</h4>
        <p className="article-description-admin">{article.price}</p>
        <p className="article-description-admin">{article.affiliateLink}</p>
        <p className="article-category-admin">{article.description}</p>
        <p>{article.category}</p>
        <img className="article-image-container-admin" src={`${process.env.REACT_APP_API}/img/${article.images[0].src}`} alt={article.images[0].alt} />
        <button className="edit-button-admin" onClick={() => handleEdit(article)}>Editer</button>
        <button className="delete-button-admin" onClick={() => handleDelete(article._id)}>Delete</button>
      </div>
    ))
  )
}

      </div></div>
  );
};

export default AdminEq;