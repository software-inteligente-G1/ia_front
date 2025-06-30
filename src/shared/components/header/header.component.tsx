export default function HeaderComponent() {
  return (
    <header
      style={{
        background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
        color: '#fff',
        boxShadow: '0 2px 12px 0 rgba(30,64,175,0.10)',
        borderRadius: '0',
        padding: '0.7rem 0',
        marginBottom: '1.2rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontWeight: 800, fontSize: '2.1rem', letterSpacing: '0.5px', margin: 0, color: '#fff', textShadow: '0 2px 8px rgba(30,64,175,0.18)' }}>
        Sistema Inteligente de Apoyo Híbrido (SIAH) - Grupo 4
      </h1>
    </header>
  );
}