import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlugarFilmeComponent } from './alugar-filme.component';

describe('AlugarFilmeComponent', () => {
  let component: AlugarFilmeComponent;
  let fixture: ComponentFixture<AlugarFilmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlugarFilmeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlugarFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
