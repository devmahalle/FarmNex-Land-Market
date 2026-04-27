import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import InquiryForm from './InquiryForm';

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInquiry, setShowInquiry] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error('Error fetching listing details:', err);
        setError('Property not found or server error.');
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const getImageUrl = (imagePath) => {
    if (!imagePath || (Array.isArray(imagePath) && imagePath.length === 0)) {
      return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80";
    }
    const pathStr = Array.isArray(imagePath) ? imagePath[0] : imagePath;
    if (pathStr.startsWith('http')) return pathStr;
    
    // Extract filename safely handling both "/uploads/name.jpg" and "uploads/name.jpg"
    let filename = pathStr;
    if (pathStr.includes('/uploads/')) {
      filename = pathStr.split('/uploads/')[1];
    } else if (pathStr.startsWith('uploads/')) {
      filename = pathStr.replace('uploads/', '');
    }
    
    // Some older listings might have just the filename
    return `${API_URL}/uploads/${encodeURIComponent(filename)}`;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', flexDirection: 'column', color: 'var(--color-primary)' }}>
        <i className="fas fa-spinner fa-spin fa-3x"></i>
        <h3 style={{ marginTop: '1rem', color: 'var(--color-text-main)' }}>Loading Property Details...</h3>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--color-text-main)' }}>
        <i className="fas fa-exclamation-triangle fa-4x" style={{ color: 'var(--color-warning)', marginBottom: '1rem' }}></i>
        <h2>{error || 'Property not found'}</h2>
        <Link to="/listings" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Search</Link>
      </div>
    );
  }

  const hasMultipleImages = listing.images && listing.images.length > 1;

  return (
    <div className="main-container" style={{ padding: '2rem 1rem', maxWidth: '1000px' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
        <Link to="/" style={{ color: 'var(--color-primary)' }}>Home</Link> &gt; 
        <Link to="/listings" style={{ color: 'var(--color-primary)', marginLeft: '0.5rem' }}>Properties</Link> &gt; 
        <span style={{ marginLeft: '0.5rem' }}>{listing.city}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        
        {/* Top Section: Header & Price */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>{listing.title}</h1>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>
              <i className="fas fa-map-marker-alt" style={{ color: 'var(--color-danger)', marginRight: '0.5rem' }}></i>
              {listing.city}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--color-text-main)' }}>
              ₹{Number(listing.price || 0).toLocaleString()}
            </div>
            {listing.status !== 'pending' && listing.status !== 'approved' && (
               <span className={`badge ${listing.status === 'sold' ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: '1rem', padding: '0.25rem 0.75rem' }}>
                 {listing.status.toUpperCase()}
               </span>
            )}
          </div>
        </div>

        {/* Media Gallery */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ position: 'relative', height: '450px', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img 
              src={getImageUrl(listing.images?.[currentImageIndex])} 
              alt={listing.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {hasMultipleImages && (
              <>
                <button 
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? listing.images.length - 1 : prev - 1))}
                  style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', boxShadow: 'var(--shadow-md)', fontSize: '1.2rem' }}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button 
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % listing.images.length)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', boxShadow: 'var(--shadow-md)', fontSize: '1.2rem' }}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem' }}>
                  {currentImageIndex + 1} / {listing.images.length}
                </div>
              </>
            )}
          </div>
          {hasMultipleImages && (
            <div style={{ display: 'flex', gap: '0.5rem', padding: '1rem', overflowX: 'auto', background: '#fafafa', borderTop: '1px solid var(--color-border)' }}>
              {listing.images.map((img, idx) => (
                <img 
                  key={idx}
                  src={getImageUrl(img)}
                  alt="thumbnail"
                  onClick={() => setCurrentImageIndex(idx)}
                  style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', border: currentImageIndex === idx ? '2px solid var(--color-primary)' : '2px solid transparent', transition: 'border 0.2s' }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content & Contact Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Details */}
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>Property Details</h2>
            <div style={{ fontSize: '1rem', color: 'var(--color-text-main)', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
              {listing.info || 'No detailed description available.'}
            </div>
            
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {listing.googleMapUrl && (
                <a href={listing.googleMapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fas fa-map-marked-alt"></i> View on Google Maps
                </a>
              )}
            </div>
          </div>

          {/* Contact Box */}
          <div className="card" style={{ padding: '2rem', height: 'fit-content', background: '#fafafa', borderTop: '4px solid var(--color-primary)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Contact Seller</h3>
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>
                <i className="fas fa-user"></i>
              </div>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>{listing.sellerId?.name || listing.sellerId?.username || 'Verified Seller'}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>FarmNex Partner</div>
              </div>
            </div>

            <button 
              className="btn btn-primary btn-block" 
              onClick={() => {
                if (!user) {
                  alert("Please log in to contact the seller.");
                } else {
                  setShowInquiry(true);
                }
              }}
              disabled={listing.status === 'sold'}
              style={{ fontSize: '1rem', padding: '0.75rem' }}
            >
              {listing.status === 'sold' ? 'Property Sold' : 'Contact Now'}
            </button>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '1rem' }}>
              By contacting, you agree to FarmNex's terms of service.
            </p>
          </div>

        </div>
      </div>

      {showInquiry && (
        <InquiryForm listing={listing} onClose={() => setShowInquiry(false)} />
      )}
    </div>
  );
};

export default ListingDetail;
