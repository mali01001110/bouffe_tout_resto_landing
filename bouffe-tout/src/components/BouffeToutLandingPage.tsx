import { useMemo, useState } from "react";
import "./BouffeToutLandingPage.css";

const ASSETS = {
  hero: "/resto.jpg",
  burger: "https://framerusercontent.com/assets/2ua2z1VLNcJIGz3wGE8YxiPOX8.png",
  pizza: "https://framerusercontent.com/assets/MBQ5yzlD5ncfjDudlwbzUgE.png",
  chicken: "https://framerusercontent.com/assets/kclHXHasZbmE1ATRkS4UckbSoX4.png",
  fries: "https://framerusercontent.com/assets/rwecZn9s11x9rhv9gUZoYgJvQ.png",
  cola: "https://framerusercontent.com/assets/Gnjb32Ftc8C8j3VxDtELdmcE6Y.png",
  rider: "https://framerusercontent.com/assets/UaEK7A39JJhEjPmkQDpmTSUA0w.png",
};

type Product = {
  id: string;
  name: string;
  price: number;
  rating: string;
  category: string;
  image: string;
  alt: string;
};

type Category = {
  label: string;
  icon: string;
};

type NavLink = [string, string];

type Cart = Record<string, number>;

const products: Product[] = [
  {
    id: "burger-zinger",
    name: "Burger Zinger",
    price: 3500,
    rating: "4.8",
    category: "BURGERS",
    image: ASSETS.burger,
    alt: "Burger Zinger au fromage, salade et tomate",
  },
  {
    id: "pizza-fromage",
    name: "Pizza au fromage",
    price: 5000,
    rating: "4.7",
    category: "PIZZAS",
    image: ASSETS.pizza,
    alt: "Pizza généreuse au fromage",
  },
  {
    id: "ailes-poulet",
    name: "Ailes de poulet (6 pièces)",
    price: 3000,
    rating: "4.9",
    category: "POULET FRIT",
    image: ASSETS.chicken,
    alt: "Ailes de poulet croustillantes",
  },
  {
    id: "frites",
    name: "Frites croustillantes",
    price: 1500,
    rating: "4.6",
    category: "FRITES",
    image: ASSETS.fries,
    alt: "Frites dorées et croustillantes",
  },
  {
    id: "coca-cola",
    name: "Coca-Cola (grand format)",
    price: 1000,
    rating: "4.7",
    category: "BOISSONS",
    image: ASSETS.cola,
    alt: "Boisson cola fraîche avec glaçons",
  },
];

const categories: Category[] = [
  { label: "BURGERS", icon: "🍔" },
  { label: "PIZZAS", icon: "🍕" },
  { label: "POULET FRIT", icon: "🍗" },
  { label: "FRITES", icon: "🍟" },
  { label: "BOISSONS", icon: "🥤" },
  { label: "WRAPS", icon: "🌯" },
  { label: "DESSERTS", icon: "🧁" },
  { label: "MENUS COMBOS", icon: "🍱" },
];

const navLinks: NavLink[] = [
  ["ACCUEIL", "#home"],
  ["MENU", "#menu"],
  ["PROMOTIONS", "#promotions"],
  ["NOS ADRESSES", "#contact"],
  ["À PROPOS", "#about"],
  ["CONTACT", "#contact"],
];

const formatPrice = (amount: number): string =>
  amount.toLocaleString("fr-FR").replace(/\u202f/g, " ") + " FCFA";

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const common = {
    fill: "none" as const,
    stroke: "currentColor" as const,
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths: Record<string, React.ReactNode> = {
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" {...common} />
        <path d="M5 20c.5-3.3 3.1-5.5 7-5.5s6.5 2.2 7 5.5" {...common} />
      </>
    ),
    bag: (
      <>
        <path d="M4 8h16l-1.2 12H5.2L4 8Z" {...common} />
        <path d="M8 9V6a4 4 0 0 1 8 0v3" {...common} />
      </>
    ),
    arrow: (
      <>
        <path d="M4 12h15" {...common} />
        <path d="m13 5 7 7-7 7" {...common} />
      </>
    ),
    truck: (
      <>
        <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" {...common} />
        <circle cx="7" cy="18" r="2" {...common} />
        <circle cx="18" cy="18" r="2" {...common} />
      </>
    ),
    heart: (
      <path
        d="M20 8.8c0 5.4-8 10.2-8 10.2S4 14.2 4 8.8A4.2 4.2 0 0 1 12 6a4.2 4.2 0 0 1 8 2.8Z"
        {...common}
      />
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" {...common} />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" {...common} />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C10 4 5 7 5 13c0 4 3 6 6 6 6 0 9-6 9-15Z" {...common} />
        <path d="M4 21c4-6 8-9 13-12" {...common} />
      </>
    ),
    tag: (
      <>
        <path d="m4 12 8-8h7v7l-8 9-7-8Z" {...common} />
        <circle cx="16" cy="8" r="1" {...common} />
      </>
    ),
    smile: (
      <>
        <circle cx="12" cy="12" r="9" {...common} />
        <path d="M8 14s1.4 2 4 2 4-2 4-2M9 9h.1M15 9h.1" {...common} />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" {...common} />
      </>
    ),
  };
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a
      className={"brand" + (compact ? " brand--compact" : "")}
      href="#home"
      aria-label="BOUFFE-TOUT, accueil"
    >
      <svg className="brand__mark" viewBox="0 0 48 48" aria-hidden="true">
        <path
          d="M8 22c0-7 7-12 16-12s16 5 16 12H8Z"
          fill="#FFB900"
          stroke="#F58220"
          strokeWidth="2"
        />
        <path d="M7 25h34v4H7z" fill="#63A745" />
        <path
          d="M9 30h30c0 5-5 8-15 8S9 35 9 30Z"
          fill="#D88831"
          stroke="#9B5726"
          strokeWidth="2"
        />
        <circle cx="17" cy="16" r="1" fill="#fff" />
        <circle cx="25" cy="14" r="1" fill="#fff" />
        <circle cx="32" cy="17" r="1" fill="#fff" />
      </svg>
      <span className="brand__copy">
        <strong>BOUFFE-TOUT</strong>
        <small>RESTAURATION RAPIDE</small>
      </span>
    </a>
  );
}

function Button({
  children,
  href,
  onClick,
  variant = "gold",
  arrow = false,
  type = "button",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: (event: React.MouseEvent) => void;
  variant?: "gold" | "dark" | "outline";
  arrow?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}) {
  const content = (
    <>
      {children}
      {arrow && <Icon name="arrow" size={14} />}
    </>
  );
  const classes = "button button--" + variant + (className ? " " + className : "");
  return href ? (
    <a className={classes} href={href}>
      {content}
    </a>
  ) : (
    <button className={classes} type={type} onClick={onClick}>
      {content}
    </button>
  );
}

function BenefitIcon({ name }: { name: string }) {
  return <span className="benefit-icon"><Icon name={name} size={23} /></span>;
}

type FooterColumnItem = [string, string] | string;

function FooterColumn({ title, items }: { title: string; items: FooterColumnItem[] }) {
  return (
    <div className="footer-column">
      <h2>{title}</h2>
      {items.map((item, index) =>
        Array.isArray(item)
          ? <a href={item[1]} key={item[0] + index}>{item[0]}</a>
          : <span key={item + index}>{item}</span>
      )}
    </div>
  );
}

export default function BouffeToutLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("BURGERS");
  const [cart, setCart] = useState<Cart>({});
  const [subscribed, setSubscribed] = useState(false);

  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const cartItems = products.filter((product) => (cart[product.id] || 0) > 0);
  const cartTotal = useMemo(
    () =>
      products.reduce(
        (total, product) => total + product.price * (cart[product.id] || 0),
        0,
      ),
    [cart],
  );

  const addToCart = (id: string) =>
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  const changeQuantity = (id: string, change: number) =>
    setCart((current) => {
      const quantity = Math.max(0, (current[id] || 0) + change);
      const next = { ...current };
      if (quantity === 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }
      return next;
    });
  const closeMenu = () => setMenuOpen(false);
  const chooseCategory = (label: string) => {
    setActiveCategory(label);
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };
  const submitNewsletter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSubscribed(true);
    event.currentTarget.reset();
  };

  return (
    <div className="bt-site">
      <div className="announcement">
        <div className="announcement__inner">
          <p>POUR VOS ENVIES GOURMANDES, <strong>CONTACTEZ-NOUS !</strong></p>
          <Button href="#contact" variant="dark" arrow>
            PARLONS-EN
          </Button>
        </div>
      </div>

      <header className="site-header">
        <div className="site-header__inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Navigation principale">
            {navLinks.map(([label, href], index) => (
              <a
                className={index === 0 ? "is-active" : ""}
                href={href}
                key={label}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button account-button"
              aria-label="Mon compte"
              type="button"
            >
              <Icon name="user" />
            </button>
            <button
              className="icon-button cart-button"
              aria-label={"Ouvrir le panier, " + cartCount + " article(s)"}
              type="button"
              onClick={() => setCartOpen(true)}
            >
              <Icon name="bag" />
              <span className="cart-count" aria-live="polite">
                {cartCount}
              </span>
            </button>
            <Button href="#menu">COMMANDER</Button>
          </div>
          <button
            className="mobile-menu-toggle"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <nav
          className={"mobile-drawer" + (menuOpen ? " mobile-drawer--open" : "")}
          aria-label="Navigation mobile"
        >
          {navLinks.map(([label, href]) => (
            <a href={href} key={label} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <button
            className="mobile-drawer__cart"
            type="button"
            onClick={() => {
              setCartOpen(true);
              closeMenu();
            }}
          >
            <Icon name="bag" size={18} /> PANIER ({cartCount})
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero__inner">
            <div className="hero-copy">
              <p className="eyebrow">LE GOÛT DU PLAISIR, À CHAQUE BOUCHÉE</p>
              <h1>
                <span>BONNE NOURRITURE.</span>
                <span className="accent">BONNE HUMEUR.</span>
              </h1>
              <p className="hero-script">Le fast-food, comme on l’aime !</p>
              <p className="hero-description">
                Des burgers savoureux, des frites croustillantes, des pizzas
                généreuses et des boissons fraîches. Tout ce qu’il faut pour se
                régaler à Abidjan !
              </p>
              <div className="hero-actions">
                <Button href="#menu" arrow>
                  COMMANDER
                </Button>
                <Button href="#menu" variant="outline">
                  VOIR LE MENU
                </Button>
              </div>
              <div className="service-benefits">
                <div className="service-benefit">
                  <Icon name="truck" size={24} />
                  <span>
                    <strong>LIVRAISON RAPIDE</strong>
                    <small>Directement chez vous</small>
                  </span>
                </div>
                <div className="service-benefit">
                  <Icon name="heart" size={24} />
                  <span>
                    <strong>QUALITÉ PREMIUM</strong>
                    <small>Des produits frais</small>
                  </span>
                </div>
                <div className="service-benefit">
                  <Icon name="lock" size={24} />
                  <span>
                    <strong>PAIEMENT SÉCURISÉ</strong>
                    <small>Simple et sans souci</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <img src={ASSETS.hero} alt="Burger, frites et cola dans une mise en scène gourmande" />
              <div className="quality-badge">
                <strong>100 %</strong>
                <span>FRAIS &amp; SAVOUREUX</span>
              </div>
            </div>
          </div>
        </section>

        <section className="category-section" aria-label="Catégories de plats">
          <div className="category-list">
            {categories.map((category) => (
              <button
                className={
                  "category-item" +
                  (activeCategory === category.label ? " category-item--active" : "")
                }
                key={category.label}
                type="button"
                onClick={() => chooseCategory(category.label)}
                aria-pressed={activeCategory === category.label}
              >
                <span className="category-item__icon" aria-hidden="true">
                  {category.icon}
                </span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="popular section-wrap" id="menu">
          <div className="section-heading">
            <div className="section-heading__title">
              <span className="decorative-line"></span>
              <h2>NOS PLATS POPULAIRES</h2>
              <span className="decorative-line decorative-line--short"></span>
            </div>
            <a href="#menu" className="text-link">
              VOIR TOUT LE MENU <Icon name="arrow" size={13} />
            </a>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-card__image">
                  <img src={product.image} alt={product.alt} loading="lazy" />
                  <button
                    className="add-button"
                    type="button"
                    aria-label={"Ajouter " + product.name + " au panier"}
                    onClick={() => addToCart(product.id)}
                  >
                    +
                  </button>
                </div>
                <div className="product-card__details">
                  <h3>{product.name}</h3>
                  <div className="rating">
                    <span aria-label="5 étoiles">★★★★★</span>
                    <small>({product.rating})</small>
                  </div>
                  <p className="product-price">{formatPrice(product.price)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="promotions section-wrap" id="promotions" aria-label="Promotions du moment">
          <article className="promo-card promo-card--gold">
            <img src={ASSETS.hero} alt="" aria-hidden="true" loading="lazy" />
            <div className="promo-card__content">
              <h2>OFFRE SPÉCIALE</h2>
              <strong>BURGER + FRITES + BOISSON</strong>
              <small>LE COMBO GOURMAND</small>
              <span className="promo-price">5 000 FCFA</span>
              <Button href="#menu" variant="dark" arrow>
                COMMANDER
              </Button>
            </div>
          </article>
          <article className="promo-card promo-card--dark">
            <img src={ASSETS.pizza} alt="" aria-hidden="true" loading="lazy" />
            <div className="promo-card__content">
              <h2>50 % DE RÉDUCTION</h2>
              <strong>SUR LES PIZZAS</strong>
              <small>Sur nos pizzas moyennes et grandes</small>
              <Button href="#menu" arrow>
                COMMANDER
              </Button>
            </div>
          </article>
          <article className="promo-card promo-card--red">
            <img src={ASSETS.rider} alt="" aria-hidden="true" loading="lazy" />
            <div className="promo-card__content">
              <h2>LIVRAISON GRATUITE</h2>
              <strong>POUR TOUTE COMMANDE</strong>
              <small>SUPÉRIEURE À 10 000 FCFA</small>
              <Button href="#menu" variant="dark" arrow>
                COMMANDER
              </Button>
            </div>
          </article>
        </section>

        <section className="why-section section-wrap" id="about">
          <div className="why-panel">
            <h2>
              POURQUOI CHOISIR <span>BOUFFE-TOUT ?</span>
            </h2>
            <div className="why-grid">
              <div className="why-item">
                <BenefitIcon name="leaf" />
                <span>
                  <strong>INGRÉDIENTS FRAIS</strong>
                  <small>Des ingrédients sélectionnés avec soin et fraîcheur.</small>
                </span>
              </div>
              <div className="why-item">
                <BenefitIcon name="truck" />
                <span>
                  <strong>LIVRAISON RAPIDE</strong>
                  <small>Vos commandes arrivent directement à votre porte.</small>
                </span>
              </div>
              <div className="why-item">
                <BenefitIcon name="tag" />
                <span>
                  <strong>MEILLEURS PRIX</strong>
                  <small>Des plats généreux à des prix accessibles à tous.</small>
                </span>
              </div>
              <div className="why-item">
                <BenefitIcon name="smile" />
                <span>
                  <strong>CLIENTS SATISFAITS</strong>
                  <small>Rejoignez notre communauté de gourmands à Abidjan.</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="newsletter" id="newsletter">
          <div className="newsletter__inner section-wrap">
            <div className="newsletter-copy">
              <h2>ENVIE DE VOUS RÉGALER ?</h2>
              <p>Recevez nos meilleures offres et promotions directement dans votre boîte mail.</p>
            </div>
            <form className="newsletter-form" onSubmit={submitNewsletter}>
              <label htmlFor="newsletter-email">VOTRE ADRESSE E-MAIL</label>
              <div className="newsletter-form__row">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  placeholder="Entrez votre adresse e-mail"
                  autoComplete="email"
                  required
                />
                <Button type="submit">S’ABONNER</Button>
              </div>
              {subscribed && (
                <p className="form-success" role="status">
                  Merci ! Votre inscription a bien été prise en compte.
                </p>
              )}
            </form>
            <div className="social-area">
              <h3>SUIVEZ-NOUS</h3>
              <div className="social-links">
                <a href="#contact" aria-label="Facebook">
                  f
                </a>
                <a href="#contact" aria-label="Instagram">
                  ◎
                </a>
                <a href="#contact" aria-label="X">X</a>
                <a href="#contact" aria-label="TikTok">
                  ♪
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="footer-grid section-wrap">
          <div className="footer-brand">
            <Brand compact />
            <p>Le goût du plaisir, à chaque bouchée !</p>
          </div>
          <FooterColumn
            title="LIENS RAPIDES"
            items={[
              ["Accueil", "#home"],
              ["Menu", "#menu"],
              ["Promotions", "#promotions"],
              ["Nos adresses", "#contact"],
              ["À propos", "#about"],
              ["Contact", "#contact"],
            ]}
          />
          <FooterColumn
            title="INFORMATIONS"
            items={[
              "FAQ",
              "Informations de livraison",
              "Conditions générales",
              "Politique de confidentialité",
              "Politique de remboursement",
            ]}
          />
          <FooterColumn
            title="ASSISTANCE"
            items={[
              "Mon compte",
              "Suivre ma commande",
              "Centre d’aide",
              "Carrières",
              "Franchise",
            ]}
          />
          <FooterColumn
            title="CONTACTEZ-NOUS"
            items={[
              "+225 XX XX XX XX XX",
              "info@bouffe-tout.com",
              "Abidjan, Côte d’Ivoire",
              "Cocody, Yopougon, Marcory, Treichville, Plateau, Abobo",
            ]}
          />
        </div>
        <div className="footer-bottom section-wrap">
          <small>© 2026 BOUFFE-TOUT. Tous droits réservés.</small>
          <div className="payment-methods" aria-label="Moyens de paiement">
            <span>VISA</span>
            <span>Mastercard</span>
            <span>AMEX</span>
            <span>PayPal</span>
          </div>
        </div>
      </footer>

      {cartOpen && (
        <div
          className="cart-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCartOpen(false);
          }}
        >
          <section className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="cart-panel__header">
              <h2 id="cart-title">VOTRE PANIER</h2>
              <button
                className="icon-button cart-close"
                type="button"
                aria-label="Fermer le panier"
                onClick={() => setCartOpen(false)}
              >
                <Icon name="close" size={16} />
              </button>
            </div>
            {cartItems.length === 0 ? (
              <p className="cart-empty">
                Votre panier est vide pour le moment. Choisissez vos plats
                favoris dans le menu pour préparer votre commande à Abidjan.
              </p>
            ) : (
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt="" />
                    <div className="cart-item__copy">
                      <strong>{item.name}</strong>
                      <small>{formatPrice(item.price)}</small>
                    </div>
                    <div className="quantity-control">
                      <button
                        type="button"
                        aria-label={"Retirer un " + item.name}
                        onClick={() => changeQuantity(item.id, -1)}
                      >
                        −
                      </button>
                      <span>{cart[item.id]}</span>
                      <button
                        type="button"
                        aria-label={"Ajouter un " + item.name}
                        onClick={() => changeQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <div className="cart-total">
                  <span>Total estimé</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
              </div>
            )}
            <p className="cart-delivery-note">
              LIVRAISON À COCODY, YOPOUGON, MARCORY ET PLUS
            </p>
            <Button href="#contact" onClick={() => setCartOpen(false)} className="cart-checkout">
              CONTINUER VERS LA COMMANDE
            </Button>
          </section>
        </div>
      )}
    </div>
  );
}
