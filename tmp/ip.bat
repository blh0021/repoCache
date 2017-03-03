REM ip Key
openssl genrsa -out keys/ip.key 4096
REM ip CSR
openssl req -new -key keys/ip.key -config config/ip.cnf -out keys/ip.csr

REM Sign ip csr with rootCA
openssl x509 -req -in keys/ip.csr -CA keys/rootCA.pem -CAkey keys/rootCA.key -CAcreateserial -out keys/ip.crt -days 500 -sha256
