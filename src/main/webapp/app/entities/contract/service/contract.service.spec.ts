import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { State } from 'app/entities/enumerations/state.model';
import { IContract, Contract } from '../contract.model';

import { ContractService } from './contract.service';

describe('Contract Service', () => {
  let service: ContractService;
  let httpMock: HttpTestingController;
  let elemDefault: IContract;
  let expectedResult: IContract | IContract[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ContractService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      dateInit: currentDate,
      dateFinal: currentDate,
      contractTerm: 0,
      contractValue: 0,
      statusContract: State.ACTIVE,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          dateInit: currentDate.format(DATE_FORMAT),
          dateFinal: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Contract', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          dateInit: currentDate.format(DATE_FORMAT),
          dateFinal: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateInit: currentDate,
          dateFinal: currentDate,
        },
        returnedFromService
      );

      service.create(new Contract()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Contract', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          dateInit: currentDate.format(DATE_FORMAT),
          dateFinal: currentDate.format(DATE_FORMAT),
          contractTerm: 1,
          contractValue: 1,
          statusContract: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateInit: currentDate,
          dateFinal: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Contract', () => {
      const patchObject = Object.assign(
        {
          dateFinal: currentDate.format(DATE_FORMAT),
          contractTerm: 1,
          statusContract: 'BBBBBB',
        },
        new Contract()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          dateInit: currentDate,
          dateFinal: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Contract', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          dateInit: currentDate.format(DATE_FORMAT),
          dateFinal: currentDate.format(DATE_FORMAT),
          contractTerm: 1,
          contractValue: 1,
          statusContract: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateInit: currentDate,
          dateFinal: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Contract', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addContractToCollectionIfMissing', () => {
      it('should add a Contract to an empty array', () => {
        const contract: IContract = { id: 123 };
        expectedResult = service.addContractToCollectionIfMissing([], contract);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contract);
      });

      it('should not add a Contract to an array that contains it', () => {
        const contract: IContract = { id: 123 };
        const contractCollection: IContract[] = [
          {
            ...contract,
          },
          { id: 456 },
        ];
        expectedResult = service.addContractToCollectionIfMissing(contractCollection, contract);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Contract to an array that doesn't contain it", () => {
        const contract: IContract = { id: 123 };
        const contractCollection: IContract[] = [{ id: 456 }];
        expectedResult = service.addContractToCollectionIfMissing(contractCollection, contract);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contract);
      });

      it('should add only unique Contract to an array', () => {
        const contractArray: IContract[] = [{ id: 123 }, { id: 456 }, { id: 11156 }];
        const contractCollection: IContract[] = [{ id: 123 }];
        expectedResult = service.addContractToCollectionIfMissing(contractCollection, ...contractArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const contract: IContract = { id: 123 };
        const contract2: IContract = { id: 456 };
        expectedResult = service.addContractToCollectionIfMissing([], contract, contract2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contract);
        expect(expectedResult).toContain(contract2);
      });

      it('should accept null and undefined values', () => {
        const contract: IContract = { id: 123 };
        expectedResult = service.addContractToCollectionIfMissing([], null, contract, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contract);
      });

      it('should return initial array if no Contract is added', () => {
        const contractCollection: IContract[] = [{ id: 123 }];
        expectedResult = service.addContractToCollectionIfMissing(contractCollection, undefined, null);
        expect(expectedResult).toEqual(contractCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
