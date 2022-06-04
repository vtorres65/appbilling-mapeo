package co.edu.sena.service.mapper;

import co.edu.sena.domain.Customer;
import co.edu.sena.domain.Invoice;
import co.edu.sena.service.dto.CustomerDTO;
import co.edu.sena.service.dto.InvoiceDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Invoice} and its DTO {@link InvoiceDTO}.
 */
@Mapper(componentModel = "spring")
public interface InvoiceMapper extends EntityMapper<InvoiceDTO, Invoice> {
    @Mapping(target = "customer", source = "customer", qualifiedByName = "customerId")
    InvoiceDTO toDto(Invoice s);

    @Named("customerId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CustomerDTO toDtoCustomerId(Customer customer);
}
