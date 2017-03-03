REM Create CA Key
openssl genrsa -out ca-key.pem 4096

REM Create CA Cert
openssl req -new -x509 -extensions v3_ca -days 9999 -config ca.cnf -key ca-key.pem -out ca-crt.pem
copy ca-crt.pem ca-crt.crt

REM create a server key
openssl genrsa -out server-key.pem 4096


openssl req -new -config server.cnf -key server-key.pem -out server-csr.pem
openssl x509 -req -extensions v3_ca -extfile server.cnf -days 999 -passin "pass:password" -in server-csr.pem -CA ca-crt.pem -CAkey ca-key.pem -CAcreateserial -out server-crt.pem
