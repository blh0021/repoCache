REM Create CA Key
openssl genrsa -out keys/rootCA.key 4096

REM Create CA Cert
openssl req -x509 -new -nodes -key keys/rootCA.key -sha256 -days 1024 -config config/rootCA.cnf -out keys/rootCA.pem
copy keys\rootCA.pem keys\rootCA.crt
