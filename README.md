# repoCache
Creates a repo cache to repositories to minimize download over internet. This service
will only retrieve and store files that are requested rather than creating an entire mirror.

## Run
```shell
node index.js
```

## NPM setup
```
npm config set registry=http://hostname:3000/repo/npm
```


## Ubuntu /etc/apt/sources.list
Put these lines at the top of the sources.list file.
```
deb http://hostname:3000/repo/ubuntu yakkety main restricted
deb http://hostname:3000/repo/ubuntu yakkety-updates main restricted
deb http://hostname:3000/repo/ubuntu yakkety-security main restricted
deb http://hostname:3000/repo/ubuntu yakkety universe
deb http://hostname:3000/repo/ubuntu yakkety-updates universe
deb http://hostname:3000/repo/ubuntu yakkety-security universe
deb http://hostname:3000/repo/ubuntu yakkety multiverse
deb http://hostname:3000/repo/ubuntu yakkety-updates multiverse
deb http://hostname:3000/repo/ubuntu yakkety-security multiverse
```
