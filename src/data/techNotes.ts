export type TechNote = {
    id: string;
    slug: string;
    title: string;
    kicker?: string;
    excerpt: string;
    heroImage: string;
    tag?: string;
    sections: { heading?: string; text: string }[];
  };
  
  export const techNotes: TechNote[] = [
    {
      id: 'led-benefits',
      slug: 'ventajas-iluminacion-led',
      title: 'Ventajas de la iluminación LED',
      kicker: 'Comparativa y buenas prácticas',
      excerpt:
        'La iluminación LED ofrece ventajas frente a tecnologías tradicionales: eficiencia, vida útil y menor consumo que se traduce en un ahorro real para tu obra.',
      heroImage:
        'https://i.postimg.cc/YC877K59/13753f592d4e4ecad92c21cec6c184f9.jpg',
      tag: 'Iluminación',
      sections: [
        { text: 'Los LED consumen menos energía y alcanzan una vida útil superior a 25.000 horas. La iluminación LED permite ahorros del 50–85% frente a incandescentes/halógenas y del 30–50% frente a CFL, manteniendo un nivel de luz equivalente. Su vida útil típica es de 15.000 a 50.000 horas, con encendido instantáneo, menor emisión de calor en el haz y sin mercurio, lo que reduce mantenimiento y mejora la seguridad. Para elegir bien, priorizá lúmenes antes que watts, definí la temperatura de color (2700–3000K cálida; 3500–4000K neutra; 5000–6500K fría), buscá CRI ≥80 (o ≥90 si te importan colores fieles: gastronomía, moda, arte) y asegurá una buena disipación térmica (cuerpo de aluminio) y driver de calidad, especialmente si vas a dimerizar.' },
        { heading: 'Recomendaciones de uso', text: 'Elegí temperatura de color según ambiente y CRI ≥ 80.' },
      ],
    },
    {
      id: 'motion-sensor',
      slug: 'sensor-de-movimiento',
      title: 'Sensor de movimiento',
      kicker: '¿Qué es y cómo funciona?',
      excerpt:
        'Detecta presencia y optimiza el consumo energético. Ideal para activar luces y dispositivos de forma automática, brindando seguridad y confort.',
      heroImage:
        'https://i.postimg.cc/y86qvpDz/sensordemovimiento.jpg',
      tag: 'Automatización',
      sections: [
        { text: 'Los sensores PIR detectan cambios de radiación infrarroja producidos por personas en movimiento. Los sensores de movimiento automatizan el encendido/apagado de luces según presencia y/o nivel de luz, logrando ahorro y seguridad. Los PIR detectan cambios de radiación infrarroja (coberturas típicas 8–12 m y 110–180° en pared; 360° y 6–10 m de diámetro en techo a 2,5–3 m). Los de microondas (Doppler) son más sensibles y pueden detectar a través de vidrios o tabiques livianos; los dual-tech combinan ambas tecnologías para reducir falsas activaciones. Para una instalación confiable, definí altura y cobertura, ajustá sensibilidad, retardo (pasillo 10–30 s; baño 2–5 min; cochera 3–10 min) y umbral de luz (10–300 lux). Verificá IP según ambiente y compatibilidad con LED (salida por relé o electrónica apta, carga mínima e inrush). Evitá orientar a fuentes de calor o corrientes de aire y, en microondas, comenzá con sensibilidad baja para no “ver” tras paredes.' },
        { heading: 'Instalación', text: 'Evitar orientación a fuentes de calor y ajustar sensibilidad.' },
      ],
    },
    {
      id: 'electric-protection',
      slug: 'proteccion-electrica',
      title: 'Protección eléctrica',
      kicker: 'Cuidá tus equipos y tu inversión',
      excerpt:
        'Los picos de tensión dañan electrodomésticos y sistemas eléctricos. Descubrí cómo los protectores de voltaje Geneve evitan pérdidas costosas.',
      heroImage:
        'https://i.postimg.cc/sgLn7TSm/proteccionelectrica.jpg',
      tag: 'Seguridad',
      sections: [
        { text: 'Un protector de voltaje desconecta tus equipos ante picos eléctricos peligrosos. Los picos y bajones de tensión dañan equipos. Un protector de tensión corta la alimentación cuando la red sale de rango seguro (y reconecta con retardo), ideal para heladeras y aires. Para PC/TV, una regleta con protección contra sobretensiones (SPD) o UPS con AVR filtra picos y mantiene la electrónica a salvo. Verificá carga (A/W), retardo, Joules e indicadores; usá siempre toma con tierra y evitá encadenar regletas.' },
        { heading: 'Aplicaciones', text: 'Recomendado en aires acondicionados, heladeras y equipos de oficina.' },
      ],
    },
    {
      id: 'co',
      slug: 'monoxido-de-carbono',
      title: 'El monóxido de carbono',
      kicker: '¿Qué es el monóxido de carbono?',
      excerpt:
        'Gas tóxico e inodoro que puede poner en riesgo tu vida. Conocé cómo detectarlo a tiempo y proteger a tu familia con dispositivos confiables.',
      heroImage:
        'https://i.postimg.cc/6QsmFH33/Screenshot-2025-09-14-at-9-06-17-AM.png',
      tag: 'Seguridad',
      sections: [
        { text: 'El CO se produce por combustión incompleta. Instalar detectores certificados salva vidas. El monóxido de carbono (CO) es un gas tóxico e inodoro que se genera por combustión incompleta en calefones, estufas, calderas, cocinas o motores. No se percibe por los sentidos y puede provocar dolor de cabeza, mareos y pérdida de conciencia. Un detector de CO monitorea el ambiente y activa una alarma potente ante niveles peligrosos, ayudando a alertar a tiempo y salvar vidas. Instalalo en pasillos y cerca de dormitorios (idealmente uno por nivel de la vivienda), no pegado al artefacto ni en baños/cocinas con vapor o corrientes de aire. Probalo mensualmente con el botón de Test, mantené la batería (o usá modelos a red con respaldo) y reemplazalo al fin de vida del sensor —generalmente entre 7 y 10 años— según indique el equipo. Además, realizá mantenimiento periódico de los artefactos a gas y ventilación adecuada.' },
        { heading: 'Ubicación de detectores', text: 'En pasillos y dormitorios; probar mensualmente.' },
      ],
    },
    {
      id: 'automation',
      slug: 'sistema-de-automatizacion',
      title: 'Sistemas de automatización',
      kicker: 'Hogares y empresas inteligentes',
      excerpt:
        'Conectá sensores, temporizadores y luces para automatizar tu entorno. Más comodidad, ahorro de energía y seguridad en un mismo sistema.',
      heroImage:
        'https://i.postimg.cc/k4TwMwnW/sistemasdeautomatizacion.jpg',
      tag: 'Automatización',
      sections: [
        { text: 'Un sistema integrado permite controlar todo desde tu celular o panel central. Los sistemas de automatización integran sensores (movimiento, presencia, luminosidad, temperatura), actuadores (relés, dimmers, tomas inteligentes) y un hub o app para crear escenas y horarios: luces que se encienden solo cuando hay gente, regulación según luz natural, apertura/cierre de portones o cortinas y alertas en el celular. Funcionan por Wi-Fi o protocolos específicos como Zigbee, Z-Wave, Thread/Matter, permitiendo control local y remoto, mayor confort y ahorro de energía sin perder simplicidad. Para implementarlos, conviene empezar por áreas de mayor uso (accesos, pasillos, sala) y elegir dispositivos certificados y del mismo ecosistema para garantizar compatibilidad. Verificá requisitos eléctricos (neutro en la caja, carga máxima), buena cobertura de red y, si el proyecto incluye tablero o 0–10V/DALI, pedí instalación a un electricista. Configurá escenas básicas como “Llegar a casa” y “Ahorro nocturno” y activá notificaciones de seguridad (detección de movimiento, humo/CO, inundación) para proteger el hogar o negocio.' },
        { heading: 'Beneficios', text: 'Reduce el consumo eléctrico y aumenta la seguridad del hogar o negocio.' },
      ],
    },
    {
      id: 'emergency-lighting',
      slug: 'iluminacion-de-emergencia',
      title: 'Iluminación de emergencia',
      kicker: 'Seguridad en todo momento',
      excerpt:
        'Cuando falla la energía, la iluminación de emergencia garantiza visibilidad y protección. Descubrí cómo elegir la mejor opción para hogares, oficinas y obras.',
      heroImage:
        'https://i.postimg.cc/jSyXnRxx/iluminaciondeemergencia.jpg',
      tag: 'Seguridad',
      sections: [
        { text: 'Las luces de emergencia se encienden automáticamente durante un corte de energía. La iluminación de emergencia asegura visibilidad y evacuación segura cuando se corta la energía. Las luminarias LED con batería se encienden automáticamente e incluyen versiones mantenidas (prenden siempre y siguen en corte) y no mantenidas (solo en corte). La autonomía típica es de 1 a 3 horas, suficiente para guiar a las personas hasta un punto seguro. Al elegir, considerá autonomía, flujo lumínico, tipo (mantenida/no mantenida), IP según el ambiente y baterías de larga vida (p. ej., LiFePO₄). Verificá cumplimiento con la normativa local, y realizá pruebas periódicas: test funcional mensual y prueba de duración completa al menos una vez al año, manteniendo las señales y rutas siempre visibles.' },
        { heading: 'Recomendaciones', text: 'Instalarlas en pasillos, salidas y escaleras para máxima seguridad.' },
      ],
    },
  ];
  