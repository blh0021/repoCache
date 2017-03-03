REM Device Key
openssl genrsa -out keys/device.key 4096
REM Device CSR
openssl req -new -key keys/device.key -config config/device.cnf -out keys/device.csr

REM Sign Device csr with rootCA
openssl x509 -req -in keys/device.csr -CA keys/rootCA.pem -CAkey keys/rootCA.key -CAcreateserial -out keys/device.crt -days 500 -sha256
