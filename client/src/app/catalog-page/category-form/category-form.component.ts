import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/classes/material-service';
import { Category } from 'src/app/shared/interfaces';
import { CatalogService } from 'src/app/shared/services/catalog-service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef
  form: FormGroup
  image: File
  imagePreview: string = ''
  isNew = true
  category: Category

  constructor(private route: ActivatedRoute,
              private catalogService: CatalogService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {name: new FormControl(null, Validators.required)}
    )

    this.form.disable()
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false
              return this.catalogService.getById(params.id)
            }  
            return of(null)
          }
        )
      )
      .subscribe(
        (catalog) => {
          if (catalog) {
            const {data} = catalog
            this.form.patchValue({
              name: data.name
            })
            this.imagePreview = data.imgSrc
            this.category = data
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  chooseFile() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    this.image = event.target?.files[0]

    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result.toString()
    }

    reader.readAsDataURL(this.image)
  }

  deleteCategory() {
    const decision = window.confirm(`Вы уверены что хотите удалить категорию? ${this.category.name}`)
    if (decision) {
      this.catalogService.delete(this.category._id)
        .subscribe(
          data => {
            MaterialService.toast(data.message)
            this.router.navigate(['/catalog'])
          },
          error => MaterialService.toast(error.error.message)
        )
    }
  }

  onSubmit() {
    this.form.disable()
    const result$ = this.isNew ?
      this.catalogService.create(this.form.value.name, this.image) :
      this.catalogService.update(this.category._id, this.form.value.name, this.image)
    result$.subscribe(
      ({message, data}) => {
        this.category = data
        MaterialService.toast(message)
        this.form.enable()
      },
      error => MaterialService.toast(error.error.message)
    )
  }
}
