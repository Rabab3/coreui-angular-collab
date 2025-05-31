import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.scss']
})
export class ArticleAddComponent {
  articleForm: FormGroup;
  submitted = false;
  categories = ['RH', 'TECHNIQUE', 'METEOR', 'SÉCURITÉ'];
  selectedFilesByCategory: { [key: string]: File[] } = {};

  constructor(private fb: FormBuilder) {
    this.articleForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      categorie: ['', Validators.required],
      fichiers: [null]
    });
  }

  get f() {
    return this.articleForm.controls;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    const selectedCategory = this.articleForm.get('categorie')?.value;

    if (files && selectedCategory) {
      const fileArray = Array.from(files);
      if (!this.selectedFilesByCategory[selectedCategory]) {
        this.selectedFilesByCategory[selectedCategory] = [];
      }
      this.selectedFilesByCategory[selectedCategory].push(...fileArray);
    }
  }

  removeFile(category: string, index: number): void {
    if (this.selectedFilesByCategory[category]) {
      this.selectedFilesByCategory[category].splice(index, 1);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.articleForm.invalid) {
      return;
    }

    const articleData = {
      ...this.articleForm.value,
      fichiers: this.selectedFilesByCategory[this.articleForm.get('categorie')?.value] || []
    };

    console.log('Article soumis :', articleData);
  }

  get selectedFiles(): File[] {
    const cat = this.articleForm.get('categorie')?.value;
    return this.selectedFilesByCategory[cat] || [];
  }
}
