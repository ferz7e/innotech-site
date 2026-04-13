export type NavigationGroup = {
  category: string;
  items: string[];
};

// Fuente única para el contenido de navegación de desktop y mobile.
export const NAVIGATION_GROUPS: NavigationGroup[] = [
  {
    category: "Infraestructura",
    items: ["Servidores", "Virtualizacion", "Backups", "Almacenamiento", "Soporte IT"],
  },
  {
    category: "Redes",
    items: ["Redes", "Seguridad de Red", "WiFi Empresarial", "LTE para Eventos"],
  },
  {
    category: "Comunicaciones",
    items: ["Telefonia VoIP"],
  },
  {
    category: "Seguridad",
    items: ["Videovigilancia IP"],
  },
  {
    category: "Automatizacion",
    items: ["Domotica"],
  },
];
