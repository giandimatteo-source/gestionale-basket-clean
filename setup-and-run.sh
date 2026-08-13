#!/bin/bash

# 🏀 GESTIONALE BASKET - Auto Setup Script

echo "=========================================="
echo "🏀 GESTIONALE BASKET - Setup Automatico"
echo "=========================================="
echo ""

# Navigate to project
cd /home/claude/gestionale-basket || exit 1

echo "📦 Installazione dipendenze ROOT..."
npm install --legacy-peer-deps

echo ""
echo "📦 Installazione dipendenze BACKEND..."
cd backend
npm install --legacy-peer-deps
cd ..

echo ""
echo "📦 Installazione dipendenze FRONTEND..."
cd frontend
npm install --legacy-peer-deps
cd ..

echo ""
echo "=========================================="
echo "✅ SETUP COMPLETATO!"
echo "=========================================="
echo ""
echo "🚀 Avvio del progetto..."
echo ""
echo "📊 Backend API: http://localhost:5000"
echo "🎨 Frontend: http://localhost:3000"
echo ""
echo "Premi CTRL+C per stoppare"
echo "=========================================="
echo ""

npm run dev
