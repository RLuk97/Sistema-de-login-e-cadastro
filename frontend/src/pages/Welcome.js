import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();



  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-header">
          <div className="welcome-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9M15 11.5C15.8 11.5 16.5 12.2 16.5 13S15.8 14.5 15 14.5 13.5 13.8 13.5 13 14.2 11.5 15 11.5M5 7V9L11 8.5V7L5 7ZM11 11.5C11.8 11.5 12.5 12.2 12.5 13S11.8 14.5 11 14.5 9.5 13.8 9.5 13 10.2 11.5 11 11.5M12 15C14.21 15 16 16.79 16 19V22H8V19C8 16.79 9.79 15 12 15Z" fill="currentColor"/>
            </svg>
          </div>
          <h1>{getCurrentGreeting()}, {user?.name}!</h1>
          <p className="welcome-subtitle">Bem-vindo ao sistema</p>
        </div>
        
        <div className="welcome-content">
          <div className="user-info">
            <h3>Informações da Conta</h3>
            <div className="info-item">
              <span className="info-label">Nome:</span>
              <span className="info-value">{user?.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">ID:</span>
              <span className="info-value">#{user?.id}</span>
            </div>
          </div>
          
          <div className="welcome-actions">
            <div className="action-card">
              <h4>🎉 Parabéns!</h4>
              <p>Você fez login com sucesso no sistema. Agora você pode acessar todas as funcionalidades disponíveis.</p>
            </div>
            
            <div className="action-card">
              <h4>🔒 Segurança</h4>
              <p>Sua sessão está protegida com JWT. Lembre-se de fazer logout quando terminar de usar o sistema.</p>
            </div>
            
          </div>
        </div>
        
        <div className="welcome-footer">
          <button 
            onClick={handleLogout}
            className="logout-button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="currentColor"/>
            </svg>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;