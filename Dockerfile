# ----------------------DEVELOPMENT------------------------
FROM node16.14.2 AS development

# Making sure application directory is owned by 'node' user
RUN mkdir /srv/valoriza && chown node:node /srv/valoriza

# This avoid to use 'root' user (good practice)
USER node

WORKDIR /srv/valoriza

# Copy only dependencies installation files, so Docker can cache 'node_modules'
COPY --chown=node:node package.json package-lock.json ./

RUN npm install


# ----------------------PRODUCTION-------------------------
FROM node16.14.2-slim AS production

USER node

WORKDIR /srv/valoriza

# Making sure 'node' user can only read 'node_modules' at production
# This COPY is taking advantage of the 'node_modules' build previously at development
COPY --from=development --chown=root:root /srv/valoriza/node_modules ./node_modules

COPY . .

CMD ["npm", "run", "start"]