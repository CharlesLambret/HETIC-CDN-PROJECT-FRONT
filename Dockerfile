FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json dans le répertoire de travail
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le fichier .env dans le répertoire de travail
COPY .env .env

# Copier tout le reste du code de l'application dans le répertoire de travail
COPY . .

# Construire l'application Next.js
RUN npm run build

# Exposer le port sur lequel l'application va tourner
EXPOSE 3000

# Démarrer l'application Next.js
CMD ["npm", "start"]