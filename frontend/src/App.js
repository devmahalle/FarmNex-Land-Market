import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useTranslation } from 'react-i18next';
import './i18n'; // Import i18n setup
import Home from './components/Home';
import BuyerListings from './components/BuyerListings';
import SellerDashboard from './components/SellerDashboard';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import ListingDetail from './components/ListingDetail';

function AppContent() {
  const { user, logout, loading } = useAuth();
  const [appReady, setAppReady] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setAppReady(true);
  }, []);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  if (!appReady || loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'var(--color-background)',
        color: 'var(--color-primary)',
        flexDirection: 'column',
        gap: '1rem',
        fontFamily: 'var(--font-heading)'
      }}>
        <i className="fas fa-spinner fa-spin fa-3x"></i>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--color-text-main)', fontWeight: '600' }}>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <i className="fas fa-leaf"></i>
            {t('brand')}
          </Link>
          <div className="navbar-nav" style={{ alignItems: 'center' }}>
            <select 
              onChange={changeLanguage} 
              defaultValue={i18n.language}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                cursor: 'pointer',
                marginRight: '1rem'
              }}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
            </select>
            {!user ? (
              <>
                <Link to="/login" className="btn btn-primary">
                  <i className="fas fa-sign-in-alt"></i> {t('login')}
                </Link>
                <Link to="/register" className="btn btn-secondary">
                  <i className="fas fa-user-plus"></i> {t('register')}
                </Link>
              </>
            ) : (
              <>
                <Link to="/listings" className="nav-link">{t('browseListings')}</Link>
                {user.role === 'seller' && (
                  <Link to="/seller" className="nav-link">
                    <i className="fas fa-tractor"></i> {t('sellerDashboard')}
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin" className="nav-link">
                    <i className="fas fa-shield-alt"></i> {t('adminPanel')}
                  </Link>
                )}
                <button onClick={logout} className="btn btn-danger">
                  <i className="fas fa-sign-out-alt"></i> {t('logout')}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<BuyerListings />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller" element={
            <ProtectedRoute roles={['seller']}>
              <SellerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
