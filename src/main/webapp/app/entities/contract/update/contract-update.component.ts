import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IContract, Contract } from '../contract.model';
import { ContractService } from '../service/contract.service';
import { State } from 'app/entities/enumerations/state.model';

@Component({
  selector: 'apblng-contract-update',
  templateUrl: './contract-update.component.html',
})
export class ContractUpdateComponent implements OnInit {
  isSaving = false;
  stateValues = Object.keys(State);

  editForm = this.fb.group({
    id: [],
    dateInit: [null, [Validators.required]],
    dateFinal: [null, [Validators.required]],
    contractTerm: [null, [Validators.required]],
    contractValue: [null, [Validators.required]],
    statusContract: [null, [Validators.required]],
  });

  constructor(protected contractService: ContractService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contract }) => {
      this.updateForm(contract);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contract = this.createFromForm();
    if (contract.id !== undefined) {
      this.subscribeToSaveResponse(this.contractService.update(contract));
    } else {
      this.subscribeToSaveResponse(this.contractService.create(contract));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContract>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(contract: IContract): void {
    this.editForm.patchValue({
      id: contract.id,
      dateInit: contract.dateInit,
      dateFinal: contract.dateFinal,
      contractTerm: contract.contractTerm,
      contractValue: contract.contractValue,
      statusContract: contract.statusContract,
    });
  }

  protected createFromForm(): IContract {
    return {
      ...new Contract(),
      id: this.editForm.get(['id'])!.value,
      dateInit: this.editForm.get(['dateInit'])!.value,
      dateFinal: this.editForm.get(['dateFinal'])!.value,
      contractTerm: this.editForm.get(['contractTerm'])!.value,
      contractValue: this.editForm.get(['contractValue'])!.value,
      statusContract: this.editForm.get(['statusContract'])!.value,
    };
  }
}
