import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PositionsService } from 'src/app/shared/services/positions-service';
import { Position, MaterialInstance } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/classes/material-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef
  positions: Position[] = []
  loading: boolean = false
  modal: MaterialInstance
  form: FormGroup
  positionId = null

  constructor(private positionsService: PositionsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
    })
    this.loading = true
    this.positionsService.fetch(this.categoryId)
      .subscribe(
        res => this.positions = res.data,
        error => MaterialService.toast(error.error.message),
        () => this.loading = false
      )
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  openModal(position?: Position) {
    this.form.reset()
    if (position) {
      this.form.patchValue({
        name: position.name,
        cost: position.cost
      })
      this.positionId = position._id
    }
    else {
      this.positionId = null
    }
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  closeModal() {
    this.modal.close()
    this.form.reset()
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation()
    const decision = window.confirm('Вы действительно хотите удалить позицию?')

    if (decision) {
      this.positionsService.delete(position._id)
      .subscribe(
        res => { 
          const idx = this.positions.findIndex(item => item._id === position._id)
          this.positions.splice(idx, 1)
          MaterialService.toast(res.message)
        },
        error => MaterialService.toast(error.error.message)
      )
    }
  }

  onSubmit(event: Event) {
    this.form.disable()
    const { name, cost } = this.form.value
    const position: Position = {
      name,
      cost,
      category: this.categoryId
    }
    if (this.positionId) {
      this.positionsService.update(this.positionId, position)
      .subscribe(
        res => {
          MaterialService.toast(res.message)
          const idx = this.positions.findIndex(item => res.data._id === item._id)
          this.positions[idx] = res.data
          this.closeModal()
        },
        error => MaterialService.toast(error.error.message),
        () => this.form.enable())
    }
    else {
      this.positionsService.create(position)
      .subscribe(
        res => {
          MaterialService.toast(res.message)
          this.positions.push(res.data)
          this.closeModal()
        },
        error => MaterialService.toast(error.error.message),
        () => {
          this.form.enable()
        }
      )
    }
  }
}
