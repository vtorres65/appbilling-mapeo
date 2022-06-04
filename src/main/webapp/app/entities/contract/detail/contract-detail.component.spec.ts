import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ContractDetailComponent } from './contract-detail.component';

describe('Contract Management Detail Component', () => {
  let comp: ContractDetailComponent;
  let fixture: ComponentFixture<ContractDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ contract: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ContractDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ContractDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load contract on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.contract).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
