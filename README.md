# repoCache
Creates a repo cache to repositories to minimize download over internet. This service
will only retrieve and store files that are requested rather than creating an entire mirror.

## Run
```shell
node index.js
```

## NPM setup
```
export https_proxy=http://<hostname>:3005
npm install
```


## Ubuntu 
```
export http_proxy=http://<hostname>:3000
apt update
apt install <pkg>
...
```
