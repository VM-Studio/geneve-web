export type TechNote = {
    id: string;
    slug: string;
    title: string;
    kicker?: string;
    excerpt: string;
    heroImage: string;
    tag?: string;
    // contenido básico para arrancar (podés expandir cuando quieras)
    sections: { heading?: string; text: string }[];
  };
  
  export const techNotes: TechNote[] = [
    {
      id: 'led-benefits',
      slug: 'ventajas-iluminacion-led',
      title: 'Ventajas de la iluminación LED',
      kicker: 'Comparativa y buenas prácticas',
      excerpt:
        'La iluminación LED ofrece ventajas frente a tecnologías tradicionales: eficiencia, vida útil y control.',
      heroImage:
        'https://images.pexels.com/photos/932266/pexels-photo-932266.jpeg?auto=compress&cs=tinysrgb&w=1600',
      tag: 'Iluminación',
      sections: [
        { text: 'Los LED consumen menos energía y alcanzan una vida útil superior a 25.000 horas.' },
        { heading: 'Recomendaciones de uso', text: 'Elegí temperatura de color según ambiente y CRI ≥ 80.' },
      ],
    },
    {
      id: 'motion-sensor',
      slug: 'sensor-de-movimiento',
      title: 'Sensor de movimiento',
      kicker: '¿Qué es y cómo funciona?',
      excerpt:
        'Detecta presencia y optimiza consumo: activación automática, escenas inteligentes y seguridad.',
      heroImage:
        'https://images.pexels.com/photos/4483773/pexels-photo-4483773.jpeg?auto=compress&cs=tinysrgb&w=1600',
      tag: 'Automatización',
      sections: [
        { text: 'Los sensores PIR detectan cambios de radiación infrarroja producidos por personas en movimiento.' },
        { heading: 'Instalación', text: 'Evitar orientación a fuentes de calor y ajustar sensibilidad.' },
      ],
    },
    {
      id: 'co',
      slug: 'monoxido-de-carbono',
      title: 'El monóxido de carbono',
      kicker: '¿Qué es el monóxido de carbono?',
      excerpt:
        'Gas tóxico e inodoro. Conocé cómo detectarlo, prevenirlo y proteger a tu familia.',
      heroImage:
        'https://images.pexels.com/photos/3932957/pexels-photo-3932957.jpeg?auto=compress&cs=tinysrgb&w=1600',
      tag: 'Seguridad',
      sections: [
        { text: 'El CO se produce por combustión incompleta. Instalar detectores certificados salva vidas.' },
        { heading: 'Ubicación de detectores', text: 'En pasillos y dormitorios; probar mensualmente.' },
      ],
    },
    {
        id: 'co',
        slug: 'monoxido-de-carbono',
        title: 'El monóxido de carbono',
        kicker: '¿Qué es el monóxido de carbono?',
        excerpt:
          'Gas tóxico e inodoro. Conocé cómo detectarlo, prevenirlo y proteger a tu familia.',
        heroImage:
          'https://images.pexels.com/photos/3932957/pexels-photo-3932957.jpeg?auto=compress&cs=tinysrgb&w=1600',
        tag: 'Seguridad',
        sections: [
          { text: 'El CO se produce por combustión incompleta. Instalar detectores certificados salva vidas.' },
          { heading: 'Ubicación de detectores', text: 'En pasillos y dormitorios; probar mensualmente.' },
        ],
      },
      {
        id: 'co',
        slug: 'monoxido-de-carbono',
        title: 'El monóxido de carbono',
        kicker: '¿Qué es el monóxido de carbono?',
        excerpt:
          'Gas tóxico e inodoro. Conocé cómo detectarlo, prevenirlo y proteger a tu familia.',
        heroImage:
          'https://images.pexels.com/photos/3932957/pexels-photo-3932957.jpeg?auto=compress&cs=tinysrgb&w=1600',
        tag: 'Seguridad',
        sections: [
          { text: 'El CO se produce por combustión incompleta. Instalar detectores certificados salva vidas.' },
          { heading: 'Ubicación de detectores', text: 'En pasillos y dormitorios; probar mensualmente.' },
        ],
      },
      {
        id: 'co',
        slug: 'monoxido-de-carbono',
        title: 'El monóxido de carbono',
        kicker: '¿Qué es el monóxido de carbono?',
        excerpt:
          'Gas tóxico e inodoro. Conocé cómo detectarlo, prevenirlo y proteger a tu familia.',
        heroImage:
          'https://images.pexels.com/photos/3932957/pexels-photo-3932957.jpeg?auto=compress&cs=tinysrgb&w=1600',
        tag: 'Seguridad',
        sections: [
          { text: 'El CO se produce por combustión incompleta. Instalar detectores certificados salva vidas.' },
          { heading: 'Ubicación de detectores', text: 'En pasillos y dormitorios; probar mensualmente.' },
        ],
      },
  ];
  