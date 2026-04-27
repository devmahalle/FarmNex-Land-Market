import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InquiryForm from "./InquiryForm";
import { API_URL } from "../config";

const BuyerListings = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCity = queryParams.get("city") || "";

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchCity, setSearchCity] = useState(initialCity);
  const [selectedListing, setSelectedListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndexes, setCurrentIndexes] = useState({});
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const [warningListing, setWarningListing] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    if (searchCity === "") {
      setFilteredListings(listings);
    } else {
      const filtered = listings.filter((listing) =>
        listing.city?.toLowerCase().includes(searchCity.toLowerCase())
      );
      setFilteredListings(filtered);
    }
  }, [searchCity, listings]);

  const fetchListings = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/listings`);
      setListings(res.data);
      
      // Apply initial filter if there was a URL parameter
      if (initialCity) {
        const filtered = res.data.filter((listing) =>
          listing.city?.toLowerCase().includes(initialCity.toLowerCase())
        );
        setFilteredListings(filtered);
      } else {
        setFilteredListings(res.data);
      }
    } catch (err) {
      console.error("Fetch listings error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
    }
    const filename = imagePath.split("/uploads/")[1] || imagePath;
    return `${API_URL}/uploads/${filename}`;
  };

  const goToNext = (listingId) => {
    setCurrentIndexes((prev) => {
      const listing = listings.find((l) => l._id === listingId);
      const current = prev[listingId] || 0;
      const totalImages = listing?.images?.length || 1;
      const next = (current + 1) % totalImages;
      return { ...prev, [listingId]: next };
    });
  };

  const goToPrev = (listingId) => {
    setCurrentIndexes((prev) => {
      const listing = listings.find((l) => l._id === listingId);
      const current = prev[listingId] || 0;
      const totalImages = listing?.images?.length || 1;
      const prevIndex = current === 0 ? totalImages - 1 : current - 1;
      return { ...prev, [listingId]: prevIndex };
    });
  };

  const handleInquiryClick = (listing) => {
    if (!user) {
      setWarningListing(listing);
      setShowLoginWarning(true);
      return;
    }
    setSelectedListing(listing);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <i className="fas fa-spinner fa-spin fa-3x" style={{ color: 'var(--color-primary)' }}></i>
        <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>Loading inventory...</p>
      </div>
    );
  }

  return (
    <>
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderBottom: '1px solid var(--color-border)', marginBottom: '2rem' }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text-main)', margin: 0 }}>Property Listings</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>
              {filteredListings.length} properties found {searchCity && `in "${searchCity}"`}
            </p>
          </div>
          <div style={{ flex: '1 1 300px', maxWidth: '500px' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <i className="fas fa-search" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}></i>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', margin: 0 }}
                  placeholder="Search by city (e.g. Pune, Delhi)"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: '4rem' }}>
        {filteredListings.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
            <div style={{ fontSize: '4rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              <i className="fas fa-folder-open"></i>
            </div>
            <h3 style={{ color: 'var(--color-text-main)' }}>No listings found</h3>
            <p style={{ color: "var(--color-text-muted)", maxWidth: '500px', margin: '0 auto 2rem' }}>
              {searchCity
                ? `We couldn't find any properties in "${searchCity}". Try expanding your search or check back later.`
                : "Inventory is currently empty. Sellers will add properties soon!"}
            </p>
            <button className="btn btn-primary" onClick={() => setSearchCity("")}>
              View All Properties
            </button>
          </div>
        ) : (
          <div className="listings-grid">
            {filteredListings.map((listing) => {
              const currentIndex = currentIndexes[listing._id] || 0;
              const totalImages = listing.images?.length || 1;

              return (
                <div key={listing._id} className="listing-card">


                  <div className="listing-image-container">
                    {listing.images?.map((image, imageIndex) => (
                      <img
                        key={`${listing._id}-${imageIndex}`}
                        src={getImageUrl(image)}
                        alt={`${listing.title} - View ${imageIndex + 1}`}
                        className="listing-image"
                        style={{
                          position: 'absolute',
                          top: 0, left: 0,
                          opacity: currentIndex === imageIndex ? 1 : 0,
                          transition: 'opacity 0.4s ease-in-out'
                        }}
                      />
                    )) || (
                        <img
                          src={getImageUrl()}
                          alt="No media"
                          className="listing-image"
                          style={{ opacity: 1 }}
                        />
                      )}


                    {totalImages > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); goToPrev(listing._id); }}
                          style={{
                            position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                            background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%',
                            width: '32px', height: '32px', cursor: 'pointer', zIndex: 2
                          }}
                        >
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); goToNext(listing._id); }}
                          style={{
                            position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                            background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%',
                            width: '32px', height: '32px', cursor: 'pointer', zIndex: 2
                          }}
                        >
                          <i className="fas fa-chevron-right"></i>
                        </button>

                        <div style={{
                          position: 'absolute', bottom: '10px', right: '10px',
                          background: 'rgba(0,0,0,0.6)', color: 'white', padding: '2px 8px',
                          borderRadius: '12px', fontSize: '0.75rem'
                        }}>
                          {currentIndex + 1} / {totalImages}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="listing-content">
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>
                      {listing.title || "Untitled Property"}
                    </h3>

                    <div className="listing-price">
                      ₹{Number(listing.price || 0).toLocaleString()}
                    </div>

                    <div className="listing-location">
                      <i className="fas fa-map-marker-alt" style={{ color: 'var(--color-danger)' }}></i>
                      {listing.city || "Location details upon request"}
                    </div>

                    <p style={{
                      fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.5',
                      display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      marginBottom: 'auto'
                    }}>
                      {listing.info || "No detailed description available for this property."}
                    </p>

                    <div className="listing-actions">
                      <Link
                        to={`/listings/${listing._id}`}
                        target="_blank"
                        className="btn btn-secondary"
                        style={{ flex: 1, textAlign: 'center' }}
                      >
                        View Details
                      </Link>

                      <button
                        className="btn btn-primary"
                        onClick={() => handleInquiryClick(listing)}
                        disabled={!user || listing.status === "sold"}
                        style={{ flex: 1 }}
                      >
                        {listing.status === "booked" ? "Reserved" :
                          listing.status === "sold" ? "Sold" :
                            user ? "Inquire" : "Login to Inquire"}
                      </button>

                      {listing.googleMapUrl && (
                        <a
                          href={listing.googleMapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline"
                          style={{ color: 'var(--color-primary)', borderColor: 'var(--color-border)' }}
                          title="View on Map"
                        >
                          <i className="fas fa-map-marked-alt"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>


      {showLoginWarning && warningListing && (
        <div className="modal-overlay" onClick={() => setShowLoginWarning(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setShowLoginWarning(false)}>
              <i className="fas fa-times"></i>
            </button>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                width: '64px', height: '64px', background: '#eff6ff', color: '#3b82f6',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem', fontSize: '24px'
              }}>
                <i className="fas fa-lock"></i>
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Authentication Required</h3>
              <p style={{ color: 'var(--color-text-muted)' }}>
                Please sign in to contact the seller directly via WhatsApp.
              </p>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <Link to="/login" className="btn btn-primary btn-block">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-secondary btn-block">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}

      {selectedListing && (
        <InquiryForm
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </>
  );
};

export default BuyerListings;
