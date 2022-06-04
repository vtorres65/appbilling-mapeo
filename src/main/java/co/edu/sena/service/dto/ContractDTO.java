package co.edu.sena.service.dto;

import co.edu.sena.domain.enumeration.State;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.edu.sena.domain.Contract} entity.
 */
public class ContractDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate dateInit;

    @NotNull
    private LocalDate dateFinal;

    @NotNull
    private Integer contractTerm;

    @NotNull
    private Double contractValue;

    @NotNull
    private State statusContract;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateInit() {
        return dateInit;
    }

    public void setDateInit(LocalDate dateInit) {
        this.dateInit = dateInit;
    }

    public LocalDate getDateFinal() {
        return dateFinal;
    }

    public void setDateFinal(LocalDate dateFinal) {
        this.dateFinal = dateFinal;
    }

    public Integer getContractTerm() {
        return contractTerm;
    }

    public void setContractTerm(Integer contractTerm) {
        this.contractTerm = contractTerm;
    }

    public Double getContractValue() {
        return contractValue;
    }

    public void setContractValue(Double contractValue) {
        this.contractValue = contractValue;
    }

    public State getStatusContract() {
        return statusContract;
    }

    public void setStatusContract(State statusContract) {
        this.statusContract = statusContract;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContractDTO)) {
            return false;
        }

        ContractDTO contractDTO = (ContractDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, contractDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ContractDTO{" +
            "id=" + getId() +
            ", dateInit='" + getDateInit() + "'" +
            ", dateFinal='" + getDateFinal() + "'" +
            ", contractTerm=" + getContractTerm() +
            ", contractValue=" + getContractValue() +
            ", statusContract='" + getStatusContract() + "'" +
            "}";
    }
}
