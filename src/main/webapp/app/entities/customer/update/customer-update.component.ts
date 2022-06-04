import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICustomer, Customer } from '../customer.model';
import { CustomerService } from '../service/customer.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IContract } from 'app/entities/contract/contract.model';
import { ContractService } from 'app/entities/contract/service/contract.service';
import { State } from 'app/entities/enumerations/state.model';

@Component({
  selector: 'apblng-customer-update',
  templateUrl: './customer-update.component.html',
})
export class CustomerUpdateComponent implements OnInit {
  isSaving = false;
  stateValues = Object.keys(State);

  usersSharedCollection: IUser[] = [];
  contractsSharedCollection: IContract[] = [];

  editForm = this.fb.group({
    id: [],
    socialReason: [null, [Validators.required, Validators.maxLength(50)]],
    nameContact: [null, [Validators.required, Validators.maxLength(50)]],
    email: [null, [Validators.required, Validators.maxLength(200)]],
    phoneNumber: [null, [Validators.required]],
    statusClient: [null, [Validators.required]],
    user: [null, Validators.required],
    contract: [],
  });

  constructor(
    protected customerService: CustomerService,
    protected userService: UserService,
    protected contractService: ContractService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customer }) => {
      this.updateForm(customer);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customer = this.createFromForm();
    if (customer.id !== undefined) {
      this.subscribeToSaveResponse(this.customerService.update(customer));
    } else {
      this.subscribeToSaveResponse(this.customerService.create(customer));
    }
  }

  trackUserById(_index: number, item: IUser): number {
    return item.id!;
  }

  trackContractById(_index: number, item: IContract): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomer>>): void {
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

  protected updateForm(customer: ICustomer): void {
    this.editForm.patchValue({
      id: customer.id,
      socialReason: customer.socialReason,
      nameContact: customer.nameContact,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      statusClient: customer.statusClient,
      user: customer.user,
      contract: customer.contract,
    });

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, customer.user);
    this.contractsSharedCollection = this.contractService.addContractToCollectionIfMissing(
      this.contractsSharedCollection,
      customer.contract
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.contractService
      .query()
      .pipe(map((res: HttpResponse<IContract[]>) => res.body ?? []))
      .pipe(
        map((contracts: IContract[]) =>
          this.contractService.addContractToCollectionIfMissing(contracts, this.editForm.get('contract')!.value)
        )
      )
      .subscribe((contracts: IContract[]) => (this.contractsSharedCollection = contracts));
  }

  protected createFromForm(): ICustomer {
    return {
      ...new Customer(),
      id: this.editForm.get(['id'])!.value,
      socialReason: this.editForm.get(['socialReason'])!.value,
      nameContact: this.editForm.get(['nameContact'])!.value,
      email: this.editForm.get(['email'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      statusClient: this.editForm.get(['statusClient'])!.value,
      user: this.editForm.get(['user'])!.value,
      contract: this.editForm.get(['contract'])!.value,
    };
  }
}
