import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [searchCity, setSearchCity] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      navigate(`/listings?city=${encodeURIComponent(searchCity.trim())}`);
    } else {
      navigate('/listings');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-background)', overflowX: 'hidden' }}>
      
      {/* Premium Hero Section */}
      <div className="hero" style={{ 
        minHeight: '75vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        position: 'relative',
        paddingBottom: '8rem' // Extra padding for overlapping search bar
      }}>
        <div style={{ animation: 'fadeUp 1s ease-out' }}>
          <span className="badge badge-success" style={{ marginBottom: '1rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            <i className="fas fa-leaf" style={{ marginRight: '0.5rem' }}></i> {t('indiaNumberOne')}
          </span>
          <h1 style={{ fontSize: '4rem', textShadow: '0 4px 20px rgba(0,0,0,0.4)', lineHeight: '1.1' }}>
            {t('discoverPerfect')} <br/>
            <span style={{ color: 'var(--color-primary-light)' }}>{t('landAndFarm')}</span>
          </h1>
          <p style={{ fontSize: '1.35rem', marginBottom: '2.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            {t('heroSubtitle')}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/listings" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '0.8rem 2rem', borderRadius: '30px' }}>
              {t('browseListings')}
            </Link>
            <a href="https://farm-nex-app-p8g9.onrender.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '0.8rem 2rem', borderRadius: '30px' }}>
              <i className="fas fa-tractor"></i> {t('farmnexCare')}
            </a>
          </div>
        </div>
      </div>

      {/* Floating Glassmorphism Search Card */}
      <div style={{ maxWidth: '900px', margin: '-5rem auto 4rem', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        <div className="card" style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ marginBottom: 0, flex: '1 1 300px' }}>
              <label htmlFor="citySearch" style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>
                <i className="fas fa-map-marker-alt" style={{ color: 'var(--color-primary)', marginRight: '0.5rem' }}></i> 
                {t('whereLooking')}
              </label>
              <div style={{ position: 'relative', marginTop: '0.5rem' }}>
                <input
                  id="citySearch"
                  type="text"
                  className="form-input"
                  style={{ padding: '1rem 1rem 1rem 3rem', fontSize: '1.1rem', borderRadius: '12px', border: '2px solid var(--color-border)', backgroundColor: 'white' }}
                  placeholder={t('searchPlaceholder')}
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
                <i className="fas fa-search" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.2rem' }}></i>
              </div>
            </div>
            <button type="submit" className="btn btn-success" style={{ padding: '1.1rem 2.5rem', fontSize: '1.1rem', borderRadius: '12px', whiteSpace: 'nowrap', height: '100%' }}>
              {t('findProperties')}
            </button>
          </form>
        </div>
      </div>


      
      {/* Modern Features Section */}
      <div style={{ padding: '6rem 1.5rem', backgroundColor: 'white', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--color-text-main)' }}>{t('whyChoose')}</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
            {t('whyChooseSubtitle')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
          
          <div className="card feature-card" style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '4px solid var(--color-primary)' }}>
            <div style={{ width: '80px', height: '80px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem', transform: 'rotate(-5deg)' }}>
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 style={{ fontSize: '1.5rem' }}>{t('featureVerified')}</h3>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem', lineHeight: '1.7' }}>
              {t('featureVerifiedDesc')}
            </p>
          </div>

          <div className="card feature-card" style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '4px solid var(--color-secondary)' }}>
            <div style={{ width: '80px', height: '80px', background: '#fef3c7', color: 'var(--color-secondary)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem', transform: 'rotate(5deg)' }}>
              <i className="fas fa-handshake"></i>
            </div>
            <h3 style={{ fontSize: '1.5rem' }}>{t('featureNegotiation')}</h3>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem', lineHeight: '1.7' }}>
              {t('featureNegotiationDesc')}
            </p>
          </div>

          <div className="card feature-card" style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '4px solid var(--color-success)' }}>
            <div style={{ width: '80px', height: '80px', background: '#dcfce7', color: 'var(--color-success)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem', transform: 'rotate(-5deg)' }}>
              <i className="fas fa-map-marked-alt"></i>
            </div>
            <h3 style={{ fontSize: '1.5rem' }}>{t('featureLocations')}</h3>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem', lineHeight: '1.7' }}>
              {t('featureLocationsDesc')}
            </p>
          </div>

        </div>
      </div>

      {/* CTA Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))',
        padding: '6rem 1.5rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2 style={{ fontSize: '3rem', color: 'white', marginBottom: '1.5rem' }}>{t('readyToFind')}</h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-primary-light)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          {t('ctaSubtitle')}
        </p>
        <Link to="/register" className="btn btn-success" style={{ padding: '1rem 3rem', fontSize: '1.25rem', borderRadius: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
          {t('createFreeAccount')}
        </Link>
      </div>

    </div>
  );
};

export default Home;
