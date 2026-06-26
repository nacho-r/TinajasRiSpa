import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import {
  ArrowRight,
  Bath,
  ChevronDown,
  Facebook,
  Flame,
  Hammer,
  Image as ImageIcon,
  Instagram,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Trees
} from "lucide-react";
import "./styles.css";

const whatsappBase = "https://wa.me/56974820423";
const facebookUrl = "https://www.facebook.com/profile.php?id=61591256011343";
const instagramUrl = "https://www.instagram.com/rispa.tinajas/";
const googleBusinessUrl = "https://share.google/o8vk84jB6jMKUQ2uR";
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const media = {
  hero: asset("assets/img/hero-ri-spa.jpeg"),
  installed: asset("assets/img/tinaja-instalada.jpeg"),
  workshop: asset("assets/img/tinaja-taller.jpeg"),
  inside: asset("assets/img/tinaja-interior.jpeg"),
  delivery: asset("assets/img/tinaja-despacho.jpeg"),
  detail: asset("assets/img/tinaja-detalle.jpeg"),
  saunaOne: asset("assets/img/sauna-01.jpeg"),
  saunaTwo: asset("assets/img/sauna-02.jpeg"),
  saunaFinished: asset("assets/img/sauna-terminado.jpeg"),
  saunaBuild: asset("assets/img/sauna-construccion.jpeg"),
  video: asset("assets/media/video-02.mp4"),
  process1: asset("assets/media/sauna-proceso-01.mp4"),
  process2: asset("assets/media/sauna-proceso-02.mp4"),
  process3: asset("assets/media/sauna-proceso-03.mp4"),
  model: asset("assets/model/tinaja.obj"),
  texture: asset("assets/model/tinaja-texture.jpg"),
  roughness: asset("assets/model/tinaja-roughness.png")
};

const gallery = [
  {
    src: media.saunaFinished,
    title: "Sauna terminado",
    alt: "Sauna barril de madera terminado en el taller de RI Spa"
  },
  {
    src: media.saunaBuild,
    title: "Construcción del techo",
    alt: "Operario instalando la tejuela del techo de un sauna en construcción"
  },
  {
    src: media.installed,
    title: "Tinaja instalada",
    alt: "Tinaja de madera instalada en terraza con interior verde agua"
  },
  {
    src: media.workshop,
    title: "Fabricación",
    alt: "Tinaja de madera en proceso de fabricación dentro del taller"
  },
  {
    src: media.inside,
    title: "Interior",
    alt: "Interior de tinaja con componentes y estructura de madera"
  },
  {
    src: media.delivery,
    title: "Despacho",
    alt: "Tinaja de madera preparada sobre camioneta para despacho"
  },
  {
    src: media.detail,
    title: "Detalles",
    alt: "Detalle de terminación y estructura de una tinaja"
  }
];

const processVideos = [
  {
    src: media.process2,
    stage: "Fabricación",
    title: "Armado en taller",
    text: "Armado de la estructura de madera y primeras terminaciones."
  },
  {
    src: media.process1,
    stage: "Terminaciones",
    title: "Barnizado",
    text: "Barnizado color madera y terminaciones de detalle."
  },
  {
    src: media.process3,
    stage: "Construcción",
    title: "Montaje del techo",
    text: "Instalación de la tejuela y cierre final antes del despacho."
  }
];

const benefits = [
  {
    icon: Bath,
    title: "Tinajas para 3 a 12 personas",
    text: "Formatos familiares o amplios para terrazas, parcelas, quinchos y alojamientos en todo Chile."
  },
  {
    icon: Flame,
    title: "Saunas y calor exterior",
    text: "Diseños pensados para descanso, desconexión y uso durante todo el año."
  },
  {
    icon: Trees,
    title: "Terminación cálida",
    text: "Madera visible con presencia natural para espacios exteriores."
  },
  {
    icon: Hammer,
    title: "Fabricación a pedido",
    text: "Ajuste de tamaño, acceso, escalera y detalles según el espacio disponible."
  }
];

const models = [
  {
    title: "Tinaja 3 a 4 personas",
    text: "Formato compacto para terrazas, patios pequeños y espacios familiares.",
    image: media.installed,
    query: "Hola, quiero cotizar una tinaja de 3 a 4 personas."
  },
  {
    title: "Tinaja 5 a 6 personas",
    text: "Una opción equilibrada para quinchos, parcelas y reuniones familiares.",
    image: media.hero,
    query: "Hola, quiero cotizar una tinaja de 5 a 6 personas."
  },
  {
    title: "Tinaja 8 a 12 personas",
    text: "Mayor capacidad para alojamientos, proyectos turísticos y espacios amplios.",
    image: media.delivery,
    query: "Hola, quiero cotizar una tinaja de 8 a 12 personas."
  },
  {
    title: "Sauna exterior",
    text: "Saunas con terminación en madera para descanso, calor seco y uso durante todo el año.",
    image: media.saunaFinished,
    query: "Hola, quiero cotizar un sauna exterior."
  }
];

const faqs = [
  {
    question: "¿Fabrican tinajas y saunas para distintas capacidades?",
    answer: "Sí. RI Spa trabaja proyectos desde 3 a 12 personas, ajustando medidas, acceso y terminaciones según el espacio disponible."
  },
  {
    question: "¿Se puede cotizar según comuna?",
    answer: "Sí. RI Spa coordina proyectos en todo Chile; para cotizar se solicita la comuna y una idea del espacio donde irá instalada la tinaja o sauna."
  },
  {
    question: "¿Las tinajas sirven para terraza, parcela o quincho?",
    answer: "Sí. Los proyectos se pueden adaptar a terrazas, parcelas, patios, quinchos y alojamientos turísticos."
  },
  {
    question: "¿Cómo coordino una cotización?",
    answer: "Puedes escribir directo por WhatsApp indicando comuna, capacidad aproximada y si buscas tinaja, sauna o ambos."
  }
];

const stats = [
  { value: "3–12", label: "personas por tinaja" },
  { value: "100%", label: "cobertura en Chile" },
  { value: "A pedido", label: "medidas a tu espacio" },
  { value: "Directo", label: "atención por WhatsApp" }
];

const marqueeWords = [
  "Tinajas de madera",
  "Saunas exteriores",
  "Hot tubs",
  "Descanso todo el año",
  "Fabricación a pedido",
  "Cobertura nacional"
];

function whatsappUrl(message = "Hola, quiero cotizar una tinaja o sauna") {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1">
      <div
        className="h-full bg-gradient-to-r from-[#0e5f58] via-[#f6c06e] to-[#f7d08a] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Cotizar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_34px_rgba(37,211,102,.5)] transition hover:scale-105 sm:h-16 sm:w-16"
    >
      <span className="absolute inset-0 rounded-full bg-[#25d366] animate-pulseRing" aria-hidden="true" />
      <MessageCircle className="relative" size={28} />
    </a>
  );
}

function ProductModel() {
  const mountRef = useRef(null);
  const resetRef = useRef(() => {});
  const [status, setStatus] = useState("Cargando modelo 3D");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 1000);
    camera.position.set(2.8, 1.9, 3.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    // Iluminación basada en entorno (reflejos realistas)
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.1;
    controls.minDistance = 1.8;
    controls.maxDistance = 8;
    controls.maxPolarAngle = Math.PI * 0.52;

    // Luz cálida principal con sombra
    const keyLight = new THREE.DirectionalLight(0xffe6bd, 2.6);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0004;
    keyLight.shadow.radius = 6;
    scene.add(keyLight);

    // Luz de relleno fría para dar volumen
    const fillLight = new THREE.DirectionalLight(0x9fe8ff, 0.6);
    fillLight.position.set(-5, 3, -3);
    scene.add(fillLight);

    // Sombra de contacto (solo recibe sombra, fondo transparente)
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 14),
      new THREE.ShadowMaterial({ opacity: 0.32 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.08;
    floor.receiveShadow = true;
    scene.add(floor);

    const modelRoot = new THREE.Group();
    scene.add(modelRoot);

    let model = null;
    let frameId = 0;
    let resizeObserver = null;
    let cancelled = false;
    const homeTarget = new THREE.Vector3();
    const homePosition = new THREE.Vector3();

    function resize() {
      const { width, height } = mount.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function fitModel(object) {
      object.position.set(0, 0, 0);
      object.scale.set(1, 1, 1);
      object.updateMatrixWorld(true);
      modelRoot.position.set(0, 0, 0);
      modelRoot.scale.set(1, 1, 1);

      const box = new THREE.Box3().setFromObject(object);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      const maxDimension = Math.max(size.x, size.y, size.z) || 1;
      object.position.copy(center).multiplyScalar(-1);
      modelRoot.add(object);
      modelRoot.scale.setScalar(2.15 / maxDimension);
      modelRoot.updateMatrixWorld(true);

      const fittedBox = new THREE.Box3().setFromObject(modelRoot);
      const fittedSize = new THREE.Vector3();
      const fittedCenter = new THREE.Vector3();
      fittedBox.getSize(fittedSize);
      fittedBox.getCenter(fittedCenter);
      modelRoot.position.sub(fittedCenter);
      modelRoot.updateMatrixWorld(true);

      const centeredBox = new THREE.Box3().setFromObject(modelRoot);
      const centeredSize = new THREE.Vector3();
      centeredBox.getSize(centeredSize);

      // Apoyar la sombra justo bajo la base del modelo
      floor.position.y = -centeredSize.y / 2 - 0.001;

      const distance = Math.max(centeredSize.x, centeredSize.y, centeredSize.z) * 2.85;
      camera.position.set(0, distance * 0.42, distance * 1.08);
      camera.near = Math.max(distance / 100, 0.01);
      camera.far = distance * 20;
      camera.updateProjectionMatrix();
      controls.target.set(0, centeredSize.y * 0.04, 0);
      controls.update();

      homePosition.copy(camera.position);
      homeTarget.copy(controls.target);
    }

    resetRef.current = () => {
      camera.position.copy(homePosition);
      controls.target.copy(homeTarget);
      controls.update();
    };

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(media.texture);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = true;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const roughness = textureLoader.load(media.roughness);
    roughness.flipY = true;

    const loader = new OBJLoader();
    loader.load(
      media.model,
      (object) => {
        if (cancelled) return;
        model = object;
        model.traverse((child) => {
          if (!child.isMesh) return;
          child.geometry.computeVertexNormals();
          child.castShadow = true;
          child.receiveShadow = true;
          child.material = new THREE.MeshStandardMaterial({
            map: texture,
            roughnessMap: roughness,
            roughness: 0.78,
            metalness: 0.05,
            envMapIntensity: 1.15
          });
        });
        fitModel(model);
        setStatus("");
      },
      undefined,
      () => {
        if (!cancelled) setStatus("No se pudo cargar el modelo 3D");
      }
    );

    function animate() {
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    resize();
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    animate();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      controls.dispose();
      pmrem.dispose();
      envTexture.dispose();
      floor.geometry.dispose();
      floor.material.dispose();
      renderer.dispose();
      texture.dispose();
      roughness.dispose();
      if (model) {
        model.traverse((child) => {
          child.geometry?.dispose();
          child.material?.dispose();
        });
      }
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      className="relative h-[62svh] min-h-[380px] overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,.34)] md:min-h-[560px]"
      style={{ background: "radial-gradient(120% 120% at 50% 18%, #3a2417 0%, #1d120c 48%, #0c0705 100%)" }}
    >
      <div ref={mountRef} className="h-full w-full" aria-label="Modelo 3D interactivo de tinaja" />
      {status && (
        <div className="absolute inset-0 grid place-items-center text-sm font-black text-white/75">
          {status}
        </div>
      )}
      <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-sm font-black text-white backdrop-blur">
        Gira, acerca y explora
      </span>
      <button
        type="button"
        onClick={() => resetRef.current()}
        className="absolute bottom-4 right-4 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-sm font-black text-white backdrop-blur transition hover:bg-black/60"
      >
        Reiniciar vista
      </button>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <div className={`scroll-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function App() {
  const [lightbox, setLightbox] = useState(null);
  const [form, setForm] = useState({
    name: "",
    project: "terraza",
    details: ""
  });

  const quoteMessage = useMemo(() => {
    const projectLabels = {
      terraza: "casa o terraza",
      parcela: "parcela o quincho",
      turismo: "cabaña o arriendo turístico"
    };

    return [
      "Hola, quiero cotizar una tinaja o sauna.",
      form.name.trim() ? `Mi nombre es ${form.name.trim()}.` : "",
      `Proyecto: ${projectLabels[form.project]}.`,
      form.details.trim() ? `Detalle: ${form.details.trim()}` : ""
    ].filter(Boolean).join(" ");
  }, [form]);

  function submitQuote(event) {
    event.preventDefault();
    window.open(whatsappUrl(quoteMessage), "_blank", "noopener");
  }

  useEffect(() => {
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5efe4] text-[#211814]">
      <ScrollProgress />
      <FloatingWhatsApp />
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/35 bg-[#f5efe4]/85 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 md:grid-cols-[auto_1fr_auto] md:px-8">
          <a href="#inicio" className="flex items-center gap-3 font-black tracking-normal">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#2e1711] text-[#f6d59b] shadow-sm">
              <Flame size={18} strokeWidth={2.8} />
            </span>
            <span className="hidden sm:inline">RI Spa</span>
          </a>
          <nav className="hidden items-center justify-center gap-8 text-sm font-semibold text-[#5d4034] md:flex">
            <a href="#modelos">Modelos</a>
            <a href="#galeria">Galería</a>
            <a href="#fabricacion">Fabricación</a>
            <a href="#vista">Vista 3D</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <a className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#0e5f58] px-4 font-extrabold text-white shadow-sm transition hover:-translate-y-0.5" href={whatsappUrl()} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            Cotizar
          </a>
        </div>
      </header>

      <main id="inicio">
        <section className="relative isolate grid min-h-[96svh] items-end overflow-hidden bg-[#130d0a] px-4 pb-8 pt-28 md:px-8 lg:px-14">
          <img className="hero-image absolute inset-0 -z-20 h-full w-full object-cover object-[50%_46%]" src={media.hero} alt="Trabajo RI Spa con tinaja y terminación de madera para exterior" width="1521" height="1900" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(19,11,8,.86),rgba(19,11,8,.4)_52%,rgba(19,11,8,.12)),linear-gradient(0deg,rgba(19,11,8,.7),transparent_52%)]" />

          {/* Vapor que se eleva */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <span className="steam" style={{ left: "12%", animationDelay: "0s" }} />
            <span className="steam" style={{ left: "26%", animationDelay: "2.4s" }} />
            <span className="steam" style={{ left: "40%", animationDelay: "1.2s" }} />
            <span className="steam" style={{ left: "62%", animationDelay: "3.1s" }} />
            <span className="steam" style={{ left: "80%", animationDelay: "0.8s" }} />
          </div>

          <div className="mx-auto grid w-full max-w-7xl gap-8 pb-40 text-white md:pb-28">
            <Reveal className="max-w-5xl">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-md">
                <span className="flex text-[#f7d08a]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <span className="text-xs font-bold text-white/90">Clientes en todo Chile · RI Spa</span>
              </div>
              <h1 className="max-w-[13ch] text-5xl font-extrabold leading-[.94] sm:text-7xl lg:text-8xl">
                Tinajas y saunas <span className="text-gradient-gold">desde 3 a 12</span> personas
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-white/85 md:text-2xl">Diseñadas para transformar tu terraza, parcela o quincho en un espacio de descanso durante todo el año.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f7d08a] px-6 font-black text-[#26140d] shadow-[0_14px_40px_rgba(247,208,138,.45)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(247,208,138,.6)]" href={whatsappUrl()} target="_blank" rel="noreferrer">
                  Cotizar ahora
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </a>
                <a className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/45 bg-white/5 px-6 font-black text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/15" href="#galeria">
                  <ImageIcon size={18} />
                  Ver trabajos
                </a>
              </div>
            </Reveal>
          </div>

          <div className="absolute inset-x-4 bottom-5 mx-auto grid max-w-7xl gap-px overflow-hidden rounded-xl border border-white/20 bg-white/20 md:inset-x-8 md:grid-cols-3 lg:inset-x-14">
            {["Tinajas", "Saunas", "3 a 12 personas"].map((title, index) => (
              <div key={title} className="bg-[#160d0a]/58 p-4 text-white backdrop-blur-md transition hover:bg-[#160d0a]/72">
                <p className="font-black">{title}</p>
                <p className="mt-1 text-sm text-white/72">{["Interior de fibra y exterior en madera", "Ambientes cálidos para exterior", "Coordinación en todo Chile"][index]}</p>
              </div>
            ))}
          </div>

          <a href="#modelos" className="scroll-hint absolute bottom-[7.5rem] left-1/2 hidden -translate-x-1/2 text-white/70 md:block" aria-label="Desplázate hacia abajo">
            <ChevronDown size={30} />
          </a>
        </section>

        {/* Banda marquee de palabras clave */}
        <div className="relative overflow-hidden border-y border-[#2e1711]/15 bg-[#2e1711] py-3 text-[#f7d08a]">
          <div className="marquee gap-0">
            {[...marqueeWords, ...marqueeWords].map((word, index) => (
              <span key={index} className="flex items-center whitespace-nowrap px-6 text-sm font-black uppercase tracking-[.18em]">
                {word}
                <Sparkles size={14} className="ml-6 text-white/40" />
              </span>
            ))}
          </div>
        </div>

        {/* Banda de estadísticas */}
        <section className="bg-[#f5efe4] px-4 py-12 md:px-8 lg:px-14">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map(({ value, label }, index) => (
              <Reveal key={label} delay={index * 80}>
                <div className="rounded-2xl border border-[#d8c4ad] bg-white/70 p-6 text-center shadow-[0_18px_50px_rgba(82,45,24,.06)]">
                  <p className="text-3xl font-extrabold text-[#0e5f58] md:text-4xl">{value}</p>
                  <p className="mt-1 text-sm font-semibold text-[#6c5549]">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="modelos" className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-14 lg:py-28">
          <Reveal className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <p className="text-xs font-black uppercase tracking-[.16em] text-[#a75b2b]">Productos RI Spa</p>
            <div>
              <h2 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">Tinajas y saunas para disfrutar el exterior todo el año</h2>
              <p className="mt-5 max-w-3xl text-lg text-[#6c5549]">Fabricamos soluciones de descanso con estética natural, detalles funcionales y presencia visual para terrazas, parcelas y proyectos turísticos en todo Chile.</p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 80}>
                <article className="card-shine group h-full rounded-2xl border border-[#d8c4ad] bg-white/62 p-6 shadow-[0_18px_50px_rgba(82,45,24,.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#0e5f58]/40 hover:shadow-[0_26px_70px_rgba(14,95,88,.18)]">
                <span className="mb-8 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[#0e5f58] to-[#13776e] text-white shadow-[0_8px_22px_rgba(14,95,88,.35)] transition group-hover:scale-110">
                  <Icon size={22} />
                </span>
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6c5549]">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-[#efe0c9] px-4 py-20 md:px-8 lg:px-14 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
            <Reveal>
              <img className="float-image h-full max-h-[760px] w-full rounded-lg object-cover object-[50%_45%] shadow-[0_24px_80px_rgba(64,35,20,.22)]" src={media.installed} alt="Tinaja terminada bajo toldo en patio con escalera de madera" loading="lazy" width="1125" height="1500" />
            </Reveal>
            <Reveal delay={120}>
              <p className="mb-3 text-xs font-black uppercase tracking-[.16em] text-[#a75b2b]">Trabajo real</p>
              <h2 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">Terminaciones visibles, madera protagonista y uso cómodo</h2>
              <p className="mt-5 text-lg text-[#6c5549]">Cada proyecto combina el carácter de la madera con interiores prácticos para el uso diario, mantención simple y una estética cálida.</p>
              <div className="mt-8 grid gap-3">
                {["Tinajas para patios, terrazas y parcelas.", "Saunas y espacios de calor para descanso.", "Coordinación directa por WhatsApp."].map((item) => (
                  <div key={item} className="flex items-center gap-3 font-bold text-[#3b2921]">
                    <Sparkles className="text-[#0e5f58]" size={19} />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-14 lg:py-28">
          <Reveal className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <p className="text-xs font-black uppercase tracking-[.16em] text-[#a75b2b]">Modelos</p>
            <div>
              <h2 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">Modelos de tinajas de madera y saunas exteriores</h2>
              <p className="mt-5 max-w-3xl text-lg text-[#6c5549]">Elige una capacidad base y coordina una cotización según comuna, medidas y tipo de instalación.</p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {models.map((model, index) => (
              <Reveal key={model.title} delay={index * 70}>
                <article className="group h-full overflow-hidden rounded-2xl border border-[#d8c4ad] bg-white/70 shadow-[0_18px_50px_rgba(82,45,24,.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_70px_rgba(82,45,24,.16)]">
                  <div className="relative overflow-hidden">
                    <img className="h-52 w-full object-cover transition duration-500 group-hover:scale-110" src={model.image} alt={`${model.title} RI Spa`} loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                  </div>
                  <div className="grid gap-4 p-5">
                    <div>
                      <h3 className="text-xl font-black">{model.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#6c5549]">{model.text}</p>
                    </div>
                    <a className="group/btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0e5f58] px-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0c4f49]" href={whatsappUrl(model.query)} target="_blank" rel="noreferrer">
                      Cotizar modelo
                      <ArrowRight size={17} className="transition group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="galeria" className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-14 lg:py-28">
          <Reveal className="max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[.16em] text-[#a75b2b]">Galería</p>
            <h2 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">Trabajos, detalles y proceso</h2>
          </Reveal>

          <div className="mt-10 grid auto-rows-[220px] gap-3 md:grid-cols-4 md:auto-rows-[250px]">
            {gallery.map((item, index) => (
              <Reveal key={item.src} delay={index * 70}>
                <button type="button" onClick={() => setLightbox(item)} className={`group relative h-full w-full overflow-hidden rounded-lg bg-[#d9c5aa] text-left ${index === 2 ? "md:col-span-2 md:row-span-2" : ""}`}>
                  <img className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105" src={item.src} alt={item.alt} loading="lazy" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 font-black text-white">{item.title}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="vista" className="bg-[#130d0a] px-4 py-20 text-white md:px-8 lg:px-14 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
              <p className="text-xs font-black uppercase tracking-[.16em] text-[#f6c06e]">Vista 3D</p>
              <h2 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">Explora el modelo desde todos los ángulos</h2>
            </Reveal>

            <Reveal className="mt-10" delay={120}>
              <ProductModel />
            </Reveal>
          </div>
        </section>

        <section id="fabricacion" className="bg-[#2e1711] px-4 py-20 text-white md:px-8 lg:px-14 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[.16em] text-[#f6c06e]">Fabricación y construcción</p>
                <h2 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">Cada sauna se construye a mano en nuestro taller</h2>
                <p className="mt-5 text-lg text-white/72">Del armado de la estructura hasta el montaje del techo: registro real del proceso de fabricación para que veas la calidad y la terminación en madera antes de cotizar.</p>
                <div className="mt-8 grid gap-3">
                  {["Estructura y paneles de madera armados pieza por pieza.", "Terminaciones, puerta y detalles ajustados a mano.", "Techo de tejuela y cierre final antes del despacho."].map((item) => (
                    <div key={item} className="flex items-start gap-3 font-semibold text-white/85">
                      <Hammer className="mt-0.5 shrink-0 text-[#f6c06e]" size={19} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,.34)]">
                <img className="h-full max-h-[520px] w-full object-cover" src={media.saunaBuild} alt="Operario instalando la tejuela del techo de un sauna en construcción" loading="lazy" width="1280" height="720" />
              </div>
            </Reveal>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {processVideos.map((item, index) => (
                <Reveal key={item.src} delay={index * 90}>
                  <article className="group h-full overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-[0_18px_50px_rgba(0,0,0,.3)]">
                    <div className="relative">
                      <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#0e5f58] px-3 py-1.5 text-xs font-black uppercase tracking-wide backdrop-blur">
                        <Play size={13} fill="currentColor" strokeWidth={0} />
                        {item.stage}
                      </span>
                      <video className="aspect-[9/16] w-full bg-black object-contain md:aspect-video" controls muted playsInline preload="metadata" poster={media.saunaFinished}>
                        <source src={item.src} type="video/mp4" />
                        Tu navegador no puede reproducir este video.
                      </video>
                    </div>
                    <div className="p-4">
                      <h3 className="font-black">{item.title}</h3>
                      <p className="mt-1 text-sm text-white/70">{item.text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-14 lg:py-28">
          <Reveal className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <p className="text-xs font-black uppercase tracking-[.16em] text-[#a75b2b]">Preguntas frecuentes</p>
            <div>
              <h2 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">Dudas comunes antes de cotizar</h2>
              <p className="mt-5 max-w-3xl text-lg text-[#6c5549]">Información útil para quienes buscan tinajas, saunas, hot tubs o espacios de descanso para exterior.</p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 70}>
                <details className="group rounded-lg border border-[#d8c4ad] bg-white/70 p-5 shadow-[0_18px_50px_rgba(82,45,24,.06)]">
                  <summary className="cursor-pointer list-none text-lg font-black text-[#211814]">
                    {faq.question}
                  </summary>
                  <p className="mt-3 leading-7 text-[#6c5549]">{faq.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contacto" className="bg-[#0e5f58] px-4 py-20 text-white md:px-8 lg:px-14 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_440px] lg:gap-20">
            <Reveal className="self-center">
              <p className="mb-3 text-xs font-black uppercase tracking-[.16em] text-[#f6d59b]">Contacto</p>
              <h2 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">Cotiza directo por WhatsApp</h2>
              <p className="mt-5 max-w-2xl text-lg text-white/78">Envía tu comuna y coordinamos los detalles de tu tinaja o sauna con cobertura en todo Chile.</p>
              <a className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-[#f7d08a] px-5 font-black text-[#26140d] transition hover:-translate-y-0.5" href={whatsappUrl()} target="_blank" rel="noreferrer">
                <MessageCircle size={19} />
                Abrir WhatsApp
              </a>

              <div className="mt-8">
                <p className="text-xs font-black uppercase tracking-[.16em] text-[#f6d59b]">Síguenos</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a className="group inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-black text-white shadow-[0_12px_30px_rgba(0,0,0,.25)] transition hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#feda75,#fa7e1e 35%,#d62976 65%,#962fbf)" }} href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram de RI Spa">
                    <Instagram size={19} />
                    Instagram
                  </a>
                  <a className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1877f2] px-5 font-black text-white shadow-[0_12px_30px_rgba(24,119,242,.35)] transition hover:-translate-y-0.5" href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook de RI Spa">
                    <Facebook size={19} />
                    Facebook
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
            <form onSubmit={submitQuote} className="grid gap-4 rounded-lg border border-white/20 bg-white/10 p-5 backdrop-blur">
              <label className="grid gap-2 text-sm font-bold text-white/82">
                Nombre
                <input className="rounded-md border border-white/20 bg-white px-3 py-3 text-[#211814] outline-none focus:ring-2 focus:ring-[#f7d08a]" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Tu nombre" autoComplete="name" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-white/82">
                Tipo de proyecto
                <select className="rounded-md border border-white/20 bg-white px-3 py-3 text-[#211814] outline-none focus:ring-2 focus:ring-[#f7d08a]" value={form.project} onChange={(event) => setForm({ ...form, project: event.target.value })}>
                  <option value="terraza">Casa o terraza</option>
                  <option value="parcela">Parcela o quincho</option>
                  <option value="turismo">Cabaña o arriendo turístico</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-white/82">
                Detalle
                <textarea className="min-h-28 resize-y rounded-md border border-white/20 bg-white px-3 py-3 text-[#211814] outline-none focus:ring-2 focus:ring-[#f7d08a]" value={form.details} onChange={(event) => setForm({ ...form, details: event.target.value })} placeholder="Comuna, medidas aproximadas o fecha ideal" />
              </label>
              <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#211814] px-5 font-black text-white transition hover:-translate-y-0.5" type="submit">
                Enviar por WhatsApp
                <ArrowRight size={18} />
              </button>
            </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[#130d0a] px-4 py-9 text-white/75 md:px-8 lg:px-14">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-4">
            <p className="font-black text-white">RI Spa · Tinajas y saunas</p>
            <div className="flex gap-3">
              <a className="grid h-11 w-11 place-items-center rounded-full text-white shadow-[0_8px_22px_rgba(0,0,0,.3)] transition hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#feda75,#fa7e1e 35%,#d62976 65%,#962fbf)" }} href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram de RI Spa">
                <Instagram size={20} />
              </a>
              <a className="grid h-11 w-11 place-items-center rounded-full bg-[#1877f2] text-white shadow-[0_8px_22px_rgba(24,119,242,.35)] transition hover:-translate-y-0.5" href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook de RI Spa">
                <Facebook size={20} />
              </a>
              <a className="grid h-11 w-11 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_8px_22px_rgba(37,211,102,.35)] transition hover:-translate-y-0.5" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="WhatsApp de RI Spa">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a className="transition hover:text-white" href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
            <a className="transition hover:text-white" href={facebookUrl} target="_blank" rel="noreferrer">Facebook</a>
            <a className="transition hover:text-white" href={googleBusinessUrl} target="_blank" rel="noreferrer">RI Tech en Google</a>
            <a className="transition hover:text-white" href={whatsappUrl()} target="_blank" rel="noreferrer">Cotizar por WhatsApp</a>
          </div>
        </div>
      </footer>

      {lightbox && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/88 p-4" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <button className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-3xl leading-none text-white" type="button" onClick={() => setLightbox(null)} aria-label="Cerrar galería">×</button>
          <img className="max-h-[88svh] rounded-lg shadow-2xl" src={lightbox.src} alt={lightbox.alt} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

export default App;
