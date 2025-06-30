import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

export default function SideBarComponent() {
  const location = useLocation();
  return (
    <Sidebar>
      <Menu
        className="bg-blue-500 h-full"
        menuItemStyles={{
        button: ({ level, active }) => {
          if (level === 0 || level === 1 ) {
            return {
              backgroundColor: active ? '#1E40AF' : '#3B82F6',
              color: active ? 'white' :  'white',
              transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
              "&:hover" : {
                backgroundColor: '#1E40AF',
                color:  'white',
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