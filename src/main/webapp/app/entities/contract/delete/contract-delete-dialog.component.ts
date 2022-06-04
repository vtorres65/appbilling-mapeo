import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IContract } from '../contract.model';
import { ContractService } from '../service/contract.service';

@Component({
  templateUrl: './contract-delete-dialog.component.html',
})
export class ContractDeleteDialogComponent {
  contract?: IContract;

  constructor(protected contractService: ContractService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contractService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
