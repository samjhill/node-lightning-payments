# node-lightning-payments

This is a fork of some code in https://github.com/chemicstry/recksplorer, which connects to [c-lightning](https://github.com/ElementsProject/lightning) and allows it to create and read invoices. 

Because I use Docker to host my lightning node, having my Node server that hosts the backend for my [Sentiment Analysis Tool](https://github.com/samjhill/sentiment-frontend) do the generating and fetching of invoices was impossible.

Instead, this small app sits inside the Docker container and handles invoices, while my main backend server proxies to it.
