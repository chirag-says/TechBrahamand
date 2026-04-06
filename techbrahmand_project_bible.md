# TechBrahmand — Project Bible

> **Last Updated:** April 3, 2026  
> **User Alias:** Ant  
> **Repository:** `d:\TechbrahamandAbhikSir\TechBramhand`

---

## 1. What is TechBrahmand?

TechBrahmand is a **full-service digital agency** that provides end-to-end tech solutions for businesses. The company's branding is built around the **Hindu Trinity (Trimurti)** — three divine aspects of creation, preservation, and transformation — mapped directly to three service pillars.

The website being built is a **client onboarding platform** — designed to attract potential clients, clearly communicate what TechBrahmand offers, and funnel them into a structured inquiry/quote pipeline.

---

## 2. The Three Service Pillars

### 🔱 Tech Brahma — **The Creator**
| Aspect | Detail |
|---|---|
| **Hindu Reference** | Lord Brahma, the god of creation |
| **Service** | Building digital products from scratch |
| **Scope** | Websites, full-stack web apps, SaaS platforms, e-commerce, branding, logos, UI/UX design — anything tech-related |
| **Target Clients** | Startups going digital, businesses needing a new platform, entrepreneurs with ideas |
| **Theme Color** | Amber / Warm Gold |

### 🛡️ Tech Vishnu — **The Preserver**
| Aspect | Detail |
|---|---|
| **Hindu Reference** | Lord Vishnu, the god of preservation/management |
| **Service** | Maintaining and managing existing digital products |
| **Scope** | Bug fixes, hosting management, SEO, content updates, performance monitoring, security patches |
| **Pricing Model** | AMC (Annual Maintenance Contract) **or** one-time fees for immediate/urgent fixes |
| **Target Clients** | Businesses with existing websites/apps that need ongoing care |
| **Theme Color** | Cyan / Deep Blue |

### ⚡ Tech Mahesh — **The Transformer (Destroyer)**
| Aspect | Detail |
|---|---|
| **Hindu Reference** | Lord Shiva (Mahesh), the god of destruction and transformation |
| **Service** | Competitive analysis and strategic edge |
| **Scope** | SEO audits, UI/UX teardowns, market positioning reports, ad strategy analysis |
| **Pricing Model** | One-time deliverable **or** ongoing retainer — based on client needs |
| **Target Clients** | Businesses wanting to outperform their competitors |
| **Theme Color** | Purple / Deep Violet |

---

## 3. Target Audience

- **Geography:** Currently serving **Indian clients**. Aspiring to expand **globally**.
- **Segments:** Startups, SMBs, and Enterprises — anyone who needs tech services.
- **Industries:** No specific vertical — horizontal approach across all industries.

---

## 4. Client Onboarding Flow

```
Client visits site → Understands services → Connects via Email or WhatsApp → TechBrahmand takes it from there
```

### Current Flow:
1. Client lands on the website
2. Browses Home, Products, Services, About pages
3. Goes to Contact page
4. Fills out inquiry form (Name, Phone, Email, Target, Budget, Timeline, Description)
5. Backend saves to MongoDB + sends SMTP email alert to admin
6. Team follows up via email or WhatsApp

### Future Enhancement (Planned):
- **AI-powered chatbot** for dynamic budget estimation
- Client chats with the bot, provides project requirements
- AI generates a budget estimate interactively
- Client can iterate and adjust parameters
- *(Full spec to be defined in a separate session)*

---

## 5. Technical Architecture

### Frontend
| Tech | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 7 | Build tool & dev server |
| TailwindCSS 4 | Styling |
| Framer Motion | Animations & transitions |
| React Router DOM | Client-side routing |
| React Three Fiber | 3D graphics (potential use) |
| Axios ~1.13.5 | HTTP client (pinned safe version) |
| Lucide React | Icons |
| React Icons | Additional icons |

### Backend
| Tech | Purpose |
|---|---|
| Express 5 | API server |
| Mongoose 9 | MongoDB ODM |
| Nodemailer | SMTP email notifications |
| Resend | Email service (alternative/backup) |
| Nodemon | Dev hot-reload |
| dotenv | Environment variable management |
| CORS | Cross-origin requests |

### Database
- **MongoDB** (cloud-hosted, connected via `MONGO_URI`)

### Deployment
- **Hosting:** Hostinger VPS
- **Domain:** Owned (`techbrahmand.com` or similar)
- **Email:** SMTP-based notifications

---

## 6. Current Page Structure

| Page | File | Purpose |
|---|---|---|
| Home | `Home.jsx` | Hero section + Trinity overview + CTA |
| Products | `Products.jsx` | Three service cards (Brahma/Vishnu/Mahesh) with detailed features |
| Services | `Services.jsx` | Service descriptions |
| About | `About.jsx` | Company information |
| Contact | `Contactus.jsx` | Lead capture form → MongoDB + email alert |
| Navbar | `Navbar.jsx` | Navigation header |
| Footer | `Footer.jsx` | Footer |

---

## 7. Data Model

### Project Inquiry (MongoDB)
```javascript
{
  target: String,        // What the client needs
  budget: String,        // Client's budget
  timeline: String,      // Expected timeline
  name: String,          // Client name
  phone: String,         // Client phone
  contactEmail: String,  // Client email
  description: String,   // Project description
  timestamps: true       // createdAt, updatedAt
}
```

---

## 8. Environment Variables

### Server (`server/.env`)
```
PORT=2000
MONGO_URI=<connection_string>
SMTP_USER=<email>
SMTP_PASS=<app_password>
FROM_EMAIL=<sender_email>
ADMIN_EMAIL=<admin_notification_email>
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:2000/api
```

---

## 9. Security Measures

- **Axios pinned to `~1.13.5`** — prevents resolution to compromised versions `1.14.1` and `0.30.4` which contained a RAT (Remote Access Trojan) via `plain-crypto-js@4.2.1`
- **npm `overrides`** block in both frontend and server `package.json` to enforce safe axios resolution across all nested dependencies

---

## 10. Assets

| Asset | Location | Description |
|---|---|---|
| `ai-hero-nobg.png` | `frontend/public/` | Hero section AI robot image (background removed) |
| `brahma.png` | `frontend/public/` | Photorealistic Lord Brahma portrait |
| `vishnu.png` | `frontend/public/` | Photorealistic Lord Vishnu portrait |
| `mahesh.png` | `frontend/public/` | Photorealistic Lord Shiva portrait |

---

## 11. Roadmap / Upcoming

- [ ] AI-powered budget estimation chatbot (separate spec pending)
- [ ] WhatsApp integration for client communication
- [ ] Portfolio / Case Studies section (past work exists under different brand)
- [ ] Blog / Insights section (for SEO)
- [ ] Testimonials
- [ ] Global expansion optimizations (multi-currency, i18n potential)

---

## 12. Key Design Principles

1. **Premium & Enterprise-feel** — The site must wow enterprise executives at first glance
2. **Trinity theming** — Amber (Brahma), Cyan (Vishnu), Purple (Mahesh) consistently across all UI
3. **No fake data** — Only show real, honest information. No inflated stats or placeholder numbers
4. **Clean & Modern** — Glassmorphism, smooth animations, elegant typography
5. **Mobile-first responsive** — Works beautifully from small phones to large desktops
