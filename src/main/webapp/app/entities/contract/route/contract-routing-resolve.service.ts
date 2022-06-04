import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IContract, Contract } from '../contract.model';
import { ContractService } from '../service/contract.service';

@Injectable({ providedIn: 'root' })
export class ContractRoutingResolveService implements Resolve<IContract> {
  constructor(protected service: ContractService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContract> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((contract: HttpResponse<Contract>) => {
          if (contract.body) {
            return of(contract.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Contract());
  }
}
