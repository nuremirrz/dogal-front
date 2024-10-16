import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MyFooter from '../components/MyFooter';
import '../styles/Error.css';

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <div className="error-container">
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Oops! Page Not Found</h2>
        <p className="error-description">
          Возможно, страница, которую вы ищете, была удалена, ее имя было изменено или она временно недоступна.
        </p>
        <Link to="/" className="error-button">
          Перейти на главную
        </Link>
      </div>
      <MyFooter />
    </>
  );
};

export default ErrorPage;
