package co.edu.sena.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link co.edu.sena.domain.Invoice} entity.
 */
public class InvoiceDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate dateInvoice;

    @NotNull
    @Size(max = 50)
    private String socialReason;

    @NotNull
    @Size(max = 200)
    private String clientAddress;

    @NotNull
    private Integer phoneNumber;

    @NotNull
    private Integer quantity;

    @NotNull
    private Double priceServices;

    @NotNull
    private Double totalValueServices;

    @NotNull
    private BigDecimal totalIva;

    @NotNull
    private Double netValues;

    private CustomerDTO customer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateInvoice() {
        return dateInvoice;
    }

    public void setDateInvoice(LocalDate dateInvoice) {
        this.dateInvoice = dateInvoice;
    }

    public String getSocialReason() {
        return socialReason;
    }

    public void setSocialReason(String socialReason) {
        this.socialReason = socialReason;
    }

    public String getClientAddress() {
        return clientAddress;
    }

    public void setClientAddress(String clientAddress) {
        this.clientAddress = clientAddress;
    }

    public Integer getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPriceServices() {
        return priceServices;
    }

    public void setPriceServices(Double priceServices) {
        this.priceServices = priceServices;
    }

    public Double getTotalValueServices() {
        return totalValueServices;
    }

    public void setTotalValueServices(Double totalValueServices) {
        this.totalValueServices = totalValueServices;
    }

    public BigDecimal getTotalIva() {
        return totalIva;
    }

    public void setTotalIva(BigDecimal totalIva) {
        this.totalIva = totalIva;
    }

    public Double getNetValues() {
        return netValues;
    }

    public void setNetValues(Double netValues) {
        this.netValues = netValues;
    }

    public CustomerDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InvoiceDTO)) {
            return false;
        }

        InvoiceDTO invoiceDTO = (InvoiceDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, invoiceDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InvoiceDTO{" +
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
            ", customer=" + getCustomer() +
            "}";
    }
}
