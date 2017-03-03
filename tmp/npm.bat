REM npm Key
openssl genrsa -out keys/npm.key 4096
REM npm CSR
openssl req -new -key keys/npm.key -config config/npm.cnf -out keys/npm.csr

REM Sign npm csr with rootCA
openssl x509 -req -in keys/npm.csr -CA keys/rootCA.pem -CAkey keys/rootCA.key -CAcreateserial -out keys/npm.crt -days 500 -sha256
