REM prorepo Key
openssl genrsa -out keys/prorepo.key 4096
REM prorepo CSR
openssl req -new -key keys/prorepo.key -config config/prorepo.cnf -out keys/prorepo.csr

REM Sign prorepo csr with rootCA
openssl x509 -req -in keys/prorepo.csr -CA keys/rootCA.pem -CAkey keys/rootCA.key -CAcreateserial -out keys/prorepo.crt -days 500 -sha256
