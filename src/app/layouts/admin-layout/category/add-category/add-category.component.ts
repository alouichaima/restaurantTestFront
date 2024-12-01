import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/__services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  @Output() closeEvent = new EventEmitter();
  categoryForm!: FormGroup;
  formSubmitted: boolean = false; // Variable pour suivre la soumission du formulaire

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [null, Validators.required], // Validation obligatoire
      description: [null, Validators.required] // Validation obligatoire ajoutée ici
    });
  }

  onSubmit(): void {
    this.formSubmitted = true; // Marque que le formulaire a été soumis
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;

      this.categoryService.addCategorie(categoryData).subscribe(
        response => {
          console.log('Category added successfully', response);

          Swal.fire({
            icon: 'success',
            title: 'Successfully added',
            showConfirmButton: false,
            timer: 1500
          });

          this.close();
        },
        error => {
          console.error('Error adding category', error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to add category',
            text: 'Something went wrong. Please try again later.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      // Alerte pour formulaire invalide
      Swal.fire({
        icon: 'error',
        title: 'Invalid form',
        text: 'Please fill in all required fields before submitting.',
        confirmButtonText: 'OK'
      });
    }
  }

  close(): void {
    this.closeEvent.emit();
  }
}
