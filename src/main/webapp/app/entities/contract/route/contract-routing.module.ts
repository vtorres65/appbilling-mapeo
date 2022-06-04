import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ContractComponent } from '../list/contract.component';
import { ContractDetailComponent } from '../detail/contract-detail.component';
import { ContractUpdateComponent } from '../update/contract-update.component';
import { ContractRoutingResolveService } from './contract-routing-resolve.service';

const contractRoute: Routes = [
  {
    path: '',
    component: ContractComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContractDetailComponent,
    resolve: {
      contract: ContractRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContractUpdateComponent,
    resolve: {
      contract: ContractRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContractUpdateComponent,
    resolve: {
      contract: ContractRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(contractRoute)],
  exports: [RouterModule],
})
export class ContractRoutingModule {}
