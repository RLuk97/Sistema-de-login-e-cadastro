import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Welcome.css';

const Welcome = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-header">
          <h1>Boa noite, {user?.name}!</h1>
          <p className="welcome-subtitle">Bem-vindo ao sistema</p>
        </div>

        <div className="account-info">
          <h3>Informações da Conta</h3>
          <div className="info-grid">
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
        </div>

        <div className="features-section">
          <div className="feature-card">
            <h4>Parabéns!</h4>
            <p>Você fez login com sucesso no sistema. Agora você pode acessar todas as funcionalidades disponíveis.</p>
          </div>

          <div className="feature-card">
            <h4>Segurança</h4>
            <p>Sua conta está protegida com JWT e criptografia de ponta. Lembre-se de fazer logout quando terminar de usar o sistema.</p>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Welcome;