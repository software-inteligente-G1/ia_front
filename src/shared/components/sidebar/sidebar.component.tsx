import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

export default function SideBarComponent() {
  const location = useLocation();
  return (
    <Sidebar
      className="custom-sidebar"
      style={{
        background: '#1e3a8a',
        borderTopRightRadius: '16px',
        borderBottomRightRadius: '0',
        boxShadow: '2px 0 12px 0 rgba(30,64,175,0.08)',
        minHeight: '100vh',
        height: '100vh',
        width: '220px',
        paddingTop: '1rem',
        overflowY: 'hidden',
      }}
    >
      <Menu
        className="custom-sidebar-menu h-full"
        menuItemStyles={{
        button: ({ level, active }) => {
          if (level === 0 || level === 1 ) {
            return {
              backgroundColor: active ? '#2563eb' : 'transparent',
              color: active ? '#fff' :  '#cbd5e1',
              fontWeight: active ? 700 : 500,
              fontSize: '1.08rem',
              borderRadius: '8px',
              margin: '0.2rem 0.5rem',
              transition: 'background-color 0.3s, color 0.3s',
              boxShadow: active ? '0 2px 12px 0 rgba(30,64,175,0.18)' : 'none',
              border: active ? '2px solid #60a5fa' : 'none',
              "&:hover" : {
                backgroundColor: '#2563eb',
                color:  '#fff',
              }
            }
          }
        },
      }}>
        <MenuItem 
          active={location.pathname === '/genetic-algorithm'}
          component={<Link to="/genetic-algorithm" />}
        >
          Algoritmo genético
        </MenuItem>
        <MenuItem 
          active={location.pathname === '/naive-bayes'}
          component={<Link to="/naive-bayes" />}
        >
          Naive Bayes
        </MenuItem>
        <MenuItem
          active={location.pathname === '/neural-networks'}
          component={<Link to="/neural-networks" />}
        >
          Redes Neuronales
        </MenuItem>
        <MenuItem
          active={location.pathname === '/nlp'}
          component={<Link to="/nlp" />}
        >
          Procesamiento de Lenguaje Natural
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}