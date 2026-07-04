#!/bin/bash
# ============================================================
# TechBrahmand VPS Deployment Script
# Run this ON your Hostinger VPS (193.203.162.160)
# ============================================================
set -e

APP_DIR="/var/www/techbrahmand"
REPO_URL="https://github.com/chirag-says/TechBrahamand.git"
BRANCH="ui-redesign-phase2"
DOMAIN="techbrahmand.giftsngifts.in"

echo "🚀 Starting TechBrahmand deployment..."

# ---- 1. System packages ----
echo "📦 Installing system dependencies..."
sudo apt update
sudo apt install -y nginx git curl

# ---- 2. Install Node.js 20 (if not present) ----
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi
echo "Node: $(node -v) | npm: $(npm -v)"

# ---- 3. Install PM2 globally ----
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
fi

# ---- 4. Clone / pull the repo ----
if [ -d "$APP_DIR" ]; then
    echo "📂 Pulling latest code..."
    cd "$APP_DIR"
    git fetch origin
    git checkout "$BRANCH"
    git pull origin "$BRANCH"
else
    echo "📂 Cloning repository..."
    sudo mkdir -p "$APP_DIR"
    sudo chown $USER:$USER "$APP_DIR"
    git clone -b "$BRANCH" "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# ---- 5. Build Frontend ----
echo "🔨 Building frontend..."
cd "$APP_DIR/frontend"
npm install
npm run build
echo "✅ Frontend built → $APP_DIR/frontend/dist"

# ---- 6. Setup Backend ----
echo "⚙️  Setting up backend..."
cd "$APP_DIR/server"
npm install --production

# Create .env if it doesn't exist (EDIT THIS with your actual keys!)
if [ ! -f .env ]; then
    echo "⚠️  Creating server/.env — EDIT THIS with your actual GROQ_API_KEY!"
    cat > .env << 'EOF'
PORT=2000
GROQ_API_KEY=your_groq_api_key_here
EOF
fi

# ---- 7. Start/Restart backend with PM2 ----
echo "🔄 Starting backend with PM2..."
cd "$APP_DIR"
pm2 delete techbrahmand-server 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u $USER --hp /home/$USER 2>/dev/null || true
echo "✅ Backend running on port 2000"

# ---- 8. Configure Nginx ----
echo "🌐 Configuring Nginx..."
sudo cp "$APP_DIR/nginx-techbrahmand.conf" "/etc/nginx/sites-available/$DOMAIN"
sudo ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"

# Remove default site if it exists
sudo rm -f /etc/nginx/sites-enabled/default

sudo nginx -t
sudo systemctl reload nginx
echo "✅ Nginx configured for $DOMAIN"

# ---- 9. SSL with Certbot (free HTTPS) ----
echo "🔒 Setting up SSL..."
if ! command -v certbot &> /dev/null; then
    sudo apt install -y certbot python3-certbot-nginx
fi
sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --email chirag@techbrahmand.com || {
    echo "⚠️  Certbot failed — make sure DNS is pointing to this server first!"
    echo "   You can run this manually later: sudo certbot --nginx -d $DOMAIN"
}

echo ""
echo "============================================"
echo "🎉 Deployment complete!"
echo "   Site: https://$DOMAIN"
echo "   API:  https://$DOMAIN/api/health"
echo "============================================"
