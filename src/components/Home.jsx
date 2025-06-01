import { useAuth } from '../context/AuthContext';
import { decodeJwt } from 'jose';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  let email = 'Usuario';

  if (token) {
    try {
      const decoded = decodeJwt(token);
      email = decoded.email || email;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>

      <header style={styles.header}>
        <div style={styles.topBar}>
          <div style={styles.userSection}>
            <span style={styles.userEmail}>{email}</span>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Cerrar sesión
            </button>
          </div>
        </div>
        <div style={styles.mainHeader}>
          <h1 style={styles.title}>Sistema de Ómnibus - Encarnación</h1>
          <p style={styles.subtitle}>
            Gestiona tus viajes, consulta rutas y accede a información en tiempo real de los ómnibus en la ciudad.
          </p>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.actionSection}>
          <h2 style={styles.welcomeTitle}>¡Bienvenido!</h2>
          <p style={styles.welcomeText}>Selecciona una opción para comenzar:</p>
          <div style={styles.buttons}>
            <button style={styles.button}>Ver horarios</button>
            <button style={styles.button}>Buscar ruta</button>
            <button style={styles.button} onClick={() => navigate('/map')}>
              Mapa de buses
            </button>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>© 2025 Sistema de Ómnibus Encarnación</footer>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    color: '#0a2342',
    fontFamily: 'Arial, sans-serif',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage:
      'url("https://i0.wp.com/encarnacion.gov.py/wp-content/uploads/2023/01/DJI_0200-scaled.jpg?resize=2048%2C1365&ssl=1")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0,
  },
  header: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(10, 35, 66, 0.85)',
    paddingBottom: '1rem',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0.5rem 2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.95rem',
  },
  userEmail: {
    opacity: 0.9,
    color: '#cbd5e1',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    color: '#cbd5e1',
    border: '1px solid #cbd5e1',
    borderRadius: '4px',
    padding: '0.25rem 0.75rem',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'background-color 0.3s ease',
  },
  mainHeader: {
    padding: '2rem 1rem 0',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    fontSize: '2.2rem',
    fontWeight: '600',
    color: '#cbd5e1',
  },
  subtitle: {
    fontSize: '1rem',
    marginTop: '0.5rem',
    color: '#94a3b8',
  },
  main: {
    position: 'relative',
    zIndex: 1,
    flex: 1,
    padding: '2rem 3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionSection: {
    textAlign: 'center',
    backgroundColor: 'rgba(10, 35, 66, 0.6)',
    padding: '2rem',
    borderRadius: '12px',
    backdropFilter: 'blur(6px)',
    boxShadow: '0 4px 12px rgba(10, 35, 66, 0.5)',
    maxWidth: '450px',
  },
  welcomeTitle: {
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
    color: '#cbd5e1',
  },
  welcomeText: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#a0aec0',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  button: {
    padding: '1rem 2.5rem',
    backgroundColor: '#0a2342',
    color: '#cbd5e1',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '600',
    boxShadow: '0 2px 6px rgba(10, 35, 66, 0.6)',
    transition: 'background-color 0.3s ease',
  },
  footer: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(10, 35, 66, 0.9)',
    color: '#cbd5e1',
    textAlign: 'center',
    padding: '1rem',
    fontSize: '0.9rem',
  },
};
