import dayjs from 'dayjs/esm';
import { ICustomer } from 'app/entities/customer/customer.model';
import { State } from 'app/entities/enumerations/state.model';

export interface IContract {
  id?: number;
  dateInit?: dayjs.Dayjs;
  dateFinal?: dayjs.Dayjs;
  contractTerm?: number;
  contractValue?: number;
  statusContract?: State;
  customers?: ICustomer[] | null;
}

export class Contract implements IContract {
  constructor(
    public id?: number,
    public dateInit?: dayjs.Dayjs,
    public dateFinal?: dayjs.Dayjs,
    public contractTerm?: number,
    public contractValue?: number,
    public statusContract?: State,
    public customers?: ICustomer[] | null
  ) {}
}

export function getContractIdentifier(contract: IContract): number | undefined {
  return contract.id;
}
