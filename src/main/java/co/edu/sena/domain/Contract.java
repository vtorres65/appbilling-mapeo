package co.edu.sena.domain;

import co.edu.sena.domain.enumeration.State;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Contract.
 */
@Entity
@Table(name = "contract")
public class Contract implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "date_init", nullable = false)
    private LocalDate dateInit;

    @NotNull
    @Column(name = "date_final", nullable = false)
    private LocalDate dateFinal;

    @NotNull
    @Column(name = "contract_term", nullable = false)
    private Integer contractTerm;

    @NotNull
    @Column(name = "contract_value", nullable = false)
    private Double contractValue;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status_contract", nullable = false)
    private State statusContract;

    @OneToMany(mappedBy = "contract")
    @JsonIgnoreProperties(value = { "user", "invoices", "contract" }, allowSetters = true)
    private Set<Customer> customers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Contract id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateInit() {
        return this.dateInit;
    }

    public Contract dateInit(LocalDate dateInit) {
        this.setDateInit(dateInit);
        return this;
    }

    public void setDateInit(LocalDate dateInit) {
        this.dateInit = dateInit;
    }

    public LocalDate getDateFinal() {
        return this.dateFinal;
    }

    public Contract dateFinal(LocalDate dateFinal) {
        this.setDateFinal(dateFinal);
        return this;
    }

    public void setDateFinal(LocalDate dateFinal) {
        this.dateFinal = dateFinal;
    }

    public Integer getContractTerm() {
        return this.contractTerm;
    }

    public Contract contractTerm(Integer contractTerm) {
        this.setContractTerm(contractTerm);
        return this;
    }

    public void setContractTerm(Integer contractTerm) {
        this.contractTerm = contractTerm;
    }

    public Double getContractValue() {
        return this.contractValue;
    }

    public Contract contractValue(Double contractValue) {
        this.setContractValue(contractValue);
        return this;
    }

    public void setContractValue(Double contractValue) {
        this.contractValue = contractValue;
    }

    public State getStatusContract() {
        return this.statusContract;
    }

    public Contract statusContract(State statusContract) {
        this.setStatusContract(statusContract);
        return this;
    }

    public void setStatusContract(State statusContract) {
        this.statusContract = statusContract;
    }

    public Set<Customer> getCustomers() {
        return this.customers;
    }

    public void setCustomers(Set<Customer> customers) {
        if (this.customers != null) {
            this.customers.forEach(i -> i.setContract(null));
        }
        if (customers != null) {
            customers.forEach(i -> i.setContract(this));
        }
        this.customers = customers;
    }

    public Contract customers(Set<Customer> customers) {
        this.setCustomers(customers);
        return this;
    }

    public Contract addCustomer(Customer customer) {
        this.customers.add(customer);
        customer.setContract(this);
        return this;
    }

    public Contract removeCustomer(Customer customer) {
        this.customers.remove(customer);
        customer.setContract(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Contract)) {
            return false;
        }
        return id != null && id.equals(((Contract) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Contract{" +
            "id=" + getId() +
            ", dateInit='" + getDateInit() + "'" +
            ", dateFinal='" + getDateFinal() + "'" +
            ", contractTerm=" + getContractTerm() +
            ", contractValue=" + getContractValue() +
            ", statusContract='" + getStatusContract() + "'" +
            "}";
    }
}
