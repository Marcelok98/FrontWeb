import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();

  const { token } = useAuth(); // <- accede al token

  // Si ya hay token, redirige al home
  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ nombre: '', email: '', password: '', general: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { nombre: '', email: '', password: '', general: '' };
    let hasError = false;

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
      hasError = true;
    }
    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
      hasError = true;
    }
    if (!password.trim()) {
      newErrors.password = 'La contraseña es requerida';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/usuarios/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear el usuario');
      }

      // Guarda el token y el usuario
      localStorage.setItem('token', data.response.token);
      localStorage.setItem('user', JSON.stringify(data.response.user));

      navigate('/home'); // Redirige después del registro
    } catch (err) {
      setErrors({ ...newErrors, general: err.message });
    } finally {
      setLoading(false);
    }
    
  };
  
  

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.header}>Registro de Usuario</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{ ...styles.input, borderColor: errors.nombre ? 'red' : '#ccc' }}
            />
            {errors.nombre && <p style={styles.error}>{errors.nombre}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ ...styles.input, borderColor: errors.email ? 'red' : '#ccc' }}
            />
            {errors.email && <p style={styles.error}>{errors.email}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...styles.input, borderColor: errors.password ? 'red' : '#ccc' }}
            />
            {errors.password && <p style={styles.error}>{errors.password}</p>}
          </div>

          {errors.general && <p style={styles.error}>{errors.general}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>

          <p style={styles.signupText}>
            ¿Ya tienes cuenta? <a href="/" style={styles.signupLink}>Inicia sesión</a>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#123456', // azul oscuro
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(10, 35, 66, 0.75)', // azul oscuro transparente
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)', // sombra más visible
    width: '100%',
    maxWidth: '400px',
    color: '#e0e7ff', // texto claro
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#cbd5e1', // azul claro header
    fontSize: '1.5rem',
  },
  formGroup: {
    marginBottom: '1.25rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#e0e7ff', // texto claro etiquetas
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #94a3b8', // borde gris azulado claro
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // input semitransparente blanco
    color: '#e0e7ff', // texto claro
    fontFamily: 'Segoe UI, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#1d4ed8', // azul vivo para botón
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
    boxSizing: 'border-box',
    marginTop: '0.25rem',
  },
  error: {
    marginTop: '0.25rem',
    fontSize: '0.85rem',
    color: '#f87171', // rojo claro
  },
  signupText: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    textAlign: 'center',
    color: '#cbd5e1',
  },
  signupLink: {
    color: '#60a5fa', // azul claro link
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};
