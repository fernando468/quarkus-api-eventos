package domain.model;

import domain.exception.ValidacaoException;
import jakarta.persistence.*;

@Entity
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false, length = 8)
    private String cep;

    @Column(nullable = false, length = 100)
    private String logradouro;

    @Column(nullable = false, length = 5)
    private String numero;

    @Column(nullable = false, length = 100)
    private String complemento;

    @Column(nullable = false, length = 60)
    private String bairro;

    @Column(nullable = false, length = 60)
    private String cidade;

    @Column(nullable = false, length = 2)
    private String estado;

    protected Endereco() {
    }

    public Endereco(String cep, String logradouro, String numero, String complemento, String bairro, String cidade, String estado) {
        setCep(cep);
        setLogradouro(logradouro);
        setNumero(numero);
        setComplemento(complemento);
        setBairro(bairro);
        setCidade(cidade);
        setEstado(estado);
    }

    public void atualizar(String cep, String logradouro, String numero, String complemento, String bairro, String cidade, String estado) {
        setCep(cep);
        setLogradouro(logradouro);
        setNumero(numero);
        setComplemento(complemento);
        setBairro(bairro);
        setCidade(cidade);
        setEstado(estado);
    }

    public Long getId() {
        return id;
    }

    public String getCep() {
        return cep;
    }

    private void setCep(String cep) {
        if (cep == null || cep.trim().isEmpty()) {
            throw new ValidacaoException("O CEP é obrigatório");
        }
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    private void setLogradouro(String logradouro) {
        if (logradouro == null || logradouro.trim().isEmpty()) {
            throw new ValidacaoException("O logradouro é obrigatório");
        }
        this.logradouro = logradouro;
    }

    public String getNumero() {
        return numero;
    }

    private void setNumero(String numero) {
        if (numero == null || numero.trim().isEmpty()) {
            throw new ValidacaoException("O número é obrigatório");
        }
        this.numero = numero;
    }

    public String getComplemento() {
        return complemento;
    }

    private void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getBairro() {
        return bairro;
    }

    private void setBairro(String bairro) {
        if (bairro == null || bairro.trim().isEmpty()) {
            throw new ValidacaoException("O bairro é obrigatório");
        }
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    private void setCidade(String cidade) {
        if (cidade == null || cidade.trim().isEmpty()) {
            throw new ValidacaoException("A cidade é obrigatória");
        }
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    private void setEstado(String estado) {
        if (estado == null || estado.trim().isEmpty()) {
            throw new ValidacaoException("O estado é obrigatório");
        }
        this.estado = estado;
    }
}
