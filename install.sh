docker exec -it lightning bash

cd home

git clone https://github.com/samjhill/node-lightning-payments

cd node-lightning-payments

curl -sL https://deb.nodesource.com/setup_8.x | bash

apt-get install nodejs -y

apt-get install npm -y

npm install forever -g

npm install

forever start index.js
