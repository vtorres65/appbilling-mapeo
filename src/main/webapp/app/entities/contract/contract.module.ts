import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ContractComponent } from './list/contract.component';
import { ContractDetailComponent } from './detail/contract-detail.component';
import { ContractUpdateComponent } from './update/contract-update.component';
import { ContractDeleteDialogComponent } from './delete/contract-delete-dialog.component';
import { ContractRoutingModule } from './route/contract-routing.module';

@NgModule({
  imports: [SharedModule, ContractRoutingModule],
  declarations: [ContractComponent, ContractDetailComponent, ContractUpdateComponent, ContractDeleteDialogComponent],
  entryComponents: [ContractDeleteDialogComponent],
})
export class ContractModule {}
