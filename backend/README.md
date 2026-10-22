# backend

- API REST para cadastro/listagem de cliente, evento e ingresso

## Tecnologias utilizadas

- Java 25
- Maven 3.10.0
- Quarkus 3.40.1
- JUnit 5.24.0
- Mockito 5.24.0
- Banco de Dados H2

## Executar a aplicação

```bash
mvn clean install
```

```bash
./mvnw quarkus:dev
```

## Swagger

[http://localhost:8080/q/swagger-ui/](http://localhost:8080/q/swagger-ui/)

## Autenticação

Gere um par RSA para a aplicação e mantenha a chave privada fora do controle de versão:

OBS: Obrigatório ter o openssl instalado.

```powershell
openssl genrsa -out privateKey.pem 2048
openssl rsa -in privateKey.pem -pubout -out publicKey.pem
```

ou passando o path

```bash
& "C:\Program Files\OpenSSL-Win64\bin\openssl.exe" genrsa -out privateKey.pem 2048
& "C:\Program Files\OpenSSL-Win64\bin\openssl.exe" rsa -in privateKey.pem -pubout -out publicKey.pem
```

caso não funcione, crie o arquivo: `privateKey.pem` e adicione o conteúdo
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpgIBAAKCAQEA709YH9vZ7WMLXj3aCOPz2FtzaJF4YRCfOC4qD6n1hPN4k2VM
ZEe7JCYZLsQTW56i1GJ4Zv0aizt+7yeyvutMvUoheOEAyX1er+00oRn/u7qUe+SE
Gcctg/JeIJ4Mt2pGTQAF9BF/TvwaftMtl/snCItF+fanEN9jCy1rxXNZyk8moxXj
fdQlbzwigOWd7lii8xbJogvQ1Bd6Y5QwB8aLQPJ0CbVWyZFF/EKBcWHeMMu4iV6+
EIwDGyc0gFt1jpvNMzOjIVS58vxKiPTI1g1ac863yxJEcjZPv0w1NH/3NUgoRL5J
6O0/QDY9/Q9ILBy5PwZuGxelhfUMbhyqDUJ3TwIDAQABAoIBAQC8vl6p2fNayHhJ
3wydYHSNWyt9+OXx4HNDkx13dzv+nSynTAjhOrX9/9Jy0RDXfRm92uBNkiiiUc1+
gFf5Pooq7VHTDdtaD3hj1vlgaqoJfVHpGUWbMz3RyJG2thEfhEFoL7GCW16GhE29
Y3+dU+foVDhfusrvgtCSG0PZ2m2iIh7J+m8eodp+KwaMCA3UUIH8/eiY5ZmlABrj
hL3rPz21BEGmKsfHPQYAF8XrqPSS4su154mhOL5fkn5y3PvIakXpLRvZhJO7GHZp
POU2VnNzmDz7ksPginC09C30Fi714qfv91ys+9xy2lEYyXuiPEm48OL/uIwFuGn4
ivoO67LZAoGBAPnzt5TntAQ/8VZTww2yejaPRkJjsA2Aw0cklzwoY1FBuv9Pz1g1
Ek7GFAON0ZxRSezjkbHFyts+/18TzSb9qTjwoHGBxK1H7ZXcxOyEICajfFHNbTfQ
3Qwkz52M8Ip+h1xY+FJ1qlf+LnbkFD14Bib5DiKBrUoHDjLgK3LKYmz9AoGBAPUZ
tOeHxdEKQh8xciJXcZxyysKsBmpY6W4zKvdKPwhPaTAKQPnM9SununCoenqpV6y/
z7HvqaMpKSp1yRtpqt4O2A0TAMWLS3pRAt9/neuv+O4U+6t3e2HJx9MH9r4e/Aqn
WvIOFwUyysaNYYpvWFkutD2XDOGnL1G40/KIfI07AoGBAJQTLxnW3k16OBYFT1OI
/V/fJydjeUO2mXlHExU/c/8Kaqaf+FzwK+Vg8TBdzuTFP39IHeLsI04Zlx4TVAEa
WyrxWouD7ikdqIGUpVDcwVNCnP61LVPYt2tfT2OtwD670KMDzjDDpmO0oIAshFUa
CsMB3r7QhgGKBn5bUUIS5ZZdAoGBAPI8VNmbC3vdGpp/oOCl8agAn7okkDac5x+9
vFIo9AD/kuMizzLTSN+7Zn0fVeVS5k7aR6gBSHP0IzZOsNLB7ViH7SmGxXV3hMI/
vIotM2OTSH/tBwphDPUJms9LiKZAMzNIUY73M/M0TspLQsKx5uxFR2ezmMyQEik/
dWG3WPmvAoGBAM6uOZDVe5/o80WdZz0HSG5RlPPlk2oLnep836JAx2IhJeC9xBQZ
Am0lFiA+xGFI2t5DxuTg7MzfPTsSTiqVxwZPH4oI5pL3yGJcB1RNSyuSNAfF46gX
3wUcxqHuSZtka6enplkfXHlV7cPAZRXWzswWtdjU3W5k5nEcZTo81I8Z
-----END RSA PRIVATE KEY-----
```

o arquivo `privateKey.pem` e adicione o conteúdo

```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA709YH9vZ7WMLXj3aCOPz
2FtzaJF4YRCfOC4qD6n1hPN4k2VMZEe7JCYZLsQTW56i1GJ4Zv0aizt+7yeyvutM
vUoheOEAyX1er+00oRn/u7qUe+SEGcctg/JeIJ4Mt2pGTQAF9BF/TvwaftMtl/sn
CItF+fanEN9jCy1rxXNZyk8moxXjfdQlbzwigOWd7lii8xbJogvQ1Bd6Y5QwB8aL
QPJ0CbVWyZFF/EKBcWHeMMu4iV6+EIwDGyc0gFt1jpvNMzOjIVS58vxKiPTI1g1a
c863yxJEcjZPv0w1NH/3NUgoRL5J6O0/QDY9/Q9ILBy5PwZuGxelhfUMbhyqDUJ3
TwIDAQAB
-----END PUBLIC KEY-----
```

Configure `JWT_PRIVATE_KEY_LOCATION` e `JWT_PUBLIC_KEY_LOCATION` com os caminhos correspondentes antes de iniciar a aplicação. Os valores padrão são `privateKey.pem` e `publicKey.pem` no diretório de execução.
