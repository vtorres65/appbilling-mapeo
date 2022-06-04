package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Invoice.
 */
@Entity
@Table(name = "invoice")
public class Invoice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "date_invoice", nullable = false)
    private LocalDate dateInvoice;

    @NotNull
    @Size(max = 50)
    @Column(name = "social_reason", length = 50, nullable = false)
    private String socialReason;

    @NotNull
    @Size(max = 200)
    @Column(name = "client_address", length = 200, nullable = false)
    private String clientAddress;

    @NotNull
    @Column(name = "phone_number", nullable = false)
    private Integer phoneNumber;

    @NotNull
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @NotNull
    @Column(name = "price_services", nullable = false)
    private Double priceServices;

    @NotNull
    @Column(name = "total_value_services", nullable = false)
    private Double totalValueServices;

    @NotNull
    @Column(name = "total_iva", precision = 21, scale = 2, nullable = false)
    private BigDecimal totalIva;

    @NotNull
    @Column(name = "net_values", nullable = false)
    private Double netValues;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "invoices", "contract" }, allowSetters = true)
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Invoice id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateInvoice() {
        return this.dateInvoice;
    }

    public Invoice dateInvoice(LocalDate dateInvoice) {
        this.setDateInvoice(dateInvoice);
        return this;
    }

    public void setDateInvoice(LocalDate dateInvoice) {
        this.dateInvoice = dateInvoice;
    }

    public String getSocialReason() {
        return this.socialReason;
    }

    public Invoice socialReason(String socialReason) {
        this.setSocialReason(socialReason);
        return this;
    }

    public void setSocialReason(String socialReason) {
        this.socialReason = socialReason;
    }

    public String getClientAddress() {
        return this.clientAddress;
    }

    public Invoice clientAddress(String clientAddress) {
        this.setClientAddress(clientAddress);
        return this;
    }

    public void setClientAddress(String clientAddress) {
        this.clientAddress = clientAddress;
    }

    public Integer getPhoneNumber() {
        return this.phoneNumber;
    }

    public Invoice phoneNumber(Integer phoneNumber) {
        this.setPhoneNumber(phoneNumber);
        return this;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public Invoice quantity(Integer quantity) {
        this.setQuantity(quantity);
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPriceServices() {
        return this.priceServices;
    }

    public Invoice priceServices(Double priceServices) {
        this.setPriceServices(priceServices);
        return this;
    }

    public void setPriceServices(Double priceServices) {
        this.priceServices = priceServices;
    }

    public Double getTotalValueServices() {
        return this.totalValueServices;
    }

    public Invoice totalValueServices(Double totalValueServices) {
        this.setTotalValueServices(totalValueServices);
        return this;
    }

    public void setTotalValueServices(Double totalValueServices) {
        this.totalValueServices = totalValueServices;
    }

    public BigDecimal getTotalIva() {
        return this.totalIva;
    }

    public Invoice totalIva(BigDecimal totalIva) {
        this.setTotalIva(totalIva);
        return this;
    }

    public void setTotalIva(BigDecimal totalIva) {
        this.totalIva = totalIva;
    }

    public Double getNetValues() {
        return this.netValues;
    }

    public Invoice netValues(Double netValues) {
        this.setNetValues(netValues);
        return this;
    }

    public void setNetValues(Double netValues) {
        this.netValues = netValues;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Invoice customer(Customer customer) {
        this.setCustomer(customer);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Invoice)) {
            return false;
        }
        return id != null && id.equals(((Invoice) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Invoice{" +
            "id=" + getId() +
            ", dateInvoice='" + getDateInvoice() + "'" +
            ", socialReason='" + getSocialReason() + "'" +
            ", clientAddress='" + getClientAddress() + "'" +
            ", phoneNumber=" + getPhoneNumber() +
            ", quantity=" + getQuantity() +
            ", priceServices=" + getPriceServices() +
            ", totalValueServices=" + getTotalValueServices() +
            ", totalIva=" + getTotalIva() +
            ", netValues=" + getNetValues() +
            "}";
    }
}
