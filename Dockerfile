FROM node:16.14.2-slim

RUN apt-get update && apt-get install dumb-init libssl1.1

ENV NODE_ENV=production
ENV DATABASE_URL=postgres://giavsqatswmdrk:63af5a25592db45074fda281824560ab5ff047790b6fb1f1796049eb8e556671@ec2-3-224-125-117.compute-1.amazonaws.com:5432/ddivnq1nu7lnk3?schema=public

# Making sure application directory is owned by 'node' user
RUN mkdir /srv/valoriza && chown node:node /srv/valoriza

WORKDIR /srv/valoriza

# Copy only dependencies installation files, so Docker can cache 'node_modules'
COPY --chown=node:node package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

COPY . .

RUN npx prisma migrate deploy && npx prisma generate

RUN ls /srv/valoriza

USER node

CMD ["npm", "run", "start"]