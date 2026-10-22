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
```

```bash
& "C:\Program Files\OpenSSL-Win64\bin\openssl.exe" rsa -in privateKey.pem -pubout -out publicKey.pem
```

caso não funcione, crie o arquivo: `privateKey.pem` e adicione o conteúdo
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDrlg22r+zUqi7+
++GltrINECqjEcH/PNhWj4m9tcDc8CthHVrTuZgEohiTW7c0eflmeMPxpbP8cFMJ
SkUVGv4Gy1+I/sPfWDHp019eMkjWnnGrhiGAnhxKCIYEnjVozAvkTpWdF3RsY7K3
7qSOz+4Kgz0is6qyRgRYETdp7G3cwppz3T3zoX0WsIC/9otY5gmUcRQaAgSIgltt
glMZgi/r08ug9YscmyW9MC7SkqSwegA+IfnUlFucC2d7Rk5KeXYCFzeJ/X52dSOZ
6J9/CipY5SA5gYGWmSaZLWbUC18nQ96099i7+ct/wBospn//qq52i9dOPLvRMcbl
NNIxtsrfAgMBAAECggEAC5zZbzRr0a3T5DjJTjBbxX4TA/fHnsvChD3OFd5kM9/Y
25AlXoNrBWtyF61xMfKDQzRXwE0hOqPUzAPvtNMgS3hx7KBWSmegCj0jmdKTuZSU
2NYjR6JDlbim1opv6osIWQgwos45rHAbqqpmTS3dt4HxnQjLNL9zzl2G5D9FyRhs
a5Yu3+7jIW/IEaKTsoJaSYxq9HWWXtEEjZoXf0t8x2gEpV70A420GpE1zlm74tMb
ZqMQywseQ/m+Mp8wqvsAzneBz/5xrlU4ptg9KACmcSNb3BTLsd0tR+MrrFlPgrUo
4QCXnT4HWIGcJkfnNOFLQATBI2D5Zdsbed4MNVcrAQKBgQD15eku0dLr/vvf2LsQ
Ovjg//jC0doSchGYw99WmwgWPwCG/VS6ec7K/pjsNmnpRTZ5Pg0IS5Qmmtn81mjU
Kkbt59Wfy7mCyzVtu5Y9079g4wmhu/chJ9GVGb0XG5B5Iu4gxoYcWw45RjbOUv8l
o0bdDEW6ahINrLwZYlb92V3pAQKBgQD1Q7FgtIwdcuxWTQzb1AbZlLEETizfUHTa
EelEvA0iCzjGxIvnTKRc8R/E7E/cOL7u3uupnKkXt2A8iMgjJCVk108pPIWLUVBa
YA3VtC7RZtES11oiaT4bYOTL2xx9VU88q6SuU2XMlfBrwT3/hibeWMzRAQC85TjU
x2lLTN3T3wKBgQDRElxDLK/za+doGfRjBmEZnUo7CwYpbMc9Zjz8e/BSSdr+62Ig
8vQ6cGJBZLqEVg7M409dYDVk5YC2ku6qhg+ss9NUfHkMlg6lcDt78g/kJuXHl/O1
Qw/Vf/7gKNWbyXFCeMkKTvk3BVYP801xCPR1ebvHlewnqFh+FLj2ONy6AQKBgFeM
nGqqyEFS3q5HvslRvEg63Z1t0nK8o5mcPyp7/iwi2VeKnW4pW5qZr/95Y2B3GSDn
jjPzaiC/Iqk5Ikf5BSgj+2v64KjEk+xO0WFxeizhiMwy90fFTZg0VDe4tUjABRLh
Kl3YA0SuWS39wwXNe15vUF1jAEJtiIXb0OhCPgT9AoGAfBgoBm5RZuPxN/aXy6uY
bO8ePmXEA1b6nDVjcEzppclATAfeeTEDILsPK8FJE5JKO36gsq2AAoC60cOzJiw1
aPFC04F0Bb28zR5Af9ncldMgpkVssqXZfBUcNyG54LXKnKv2NpGgR5cSu3Fe4fIV
P6nXv0x7V1PEd8/8CDm1qWY=
-----END PRIVATE KEY-----

```

o arquivo `privateKey.pem` e adicione o conteúdo

```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA65YNtq/s1Kou/vvhpbay
DRAqoxHB/zzYVo+JvbXA3PArYR1a07mYBKIYk1u3NHn5ZnjD8aWz/HBTCUpFFRr+
BstfiP7D31gx6dNfXjJI1p5xq4YhgJ4cSgiGBJ41aMwL5E6VnRd0bGOyt+6kjs/u
CoM9IrOqskYEWBE3aext3MKac90986F9FrCAv/aLWOYJlHEUGgIEiIJbbYJTGYIv
69PLoPWLHJslvTAu0pKksHoAPiH51JRbnAtne0ZOSnl2Ahc3if1+dnUjmeiffwoq
WOUgOYGBlpkmmS1m1AtfJ0PetPfYu/nLf8AaLKZ//6qudovXTjy70THG5TTSMbbK
3wIDAQAB
-----END PUBLIC KEY-----
```

Configure `JWT_PRIVATE_KEY_LOCATION` e `JWT_PUBLIC_KEY_LOCATION` com os caminhos correspondentes antes de iniciar a aplicação. Os valores padrão são `privateKey.pem` e `publicKey.pem` no diretório de execução.
