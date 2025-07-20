import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from 'src/app/services/article.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Editor, NgxEditorModule } from 'ngx-editor';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import * as docx from 'docx';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxEditorModule],
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.scss']
})
export class ArticleAddComponent implements OnInit, OnDestroy {
  articleForm!: FormGroup;
  submitted = false;
  editor!: Editor;
  useTextEditor = true;
  selectedFiles: File[] = [];
  showPreviewModal = false;
  today = new Date().toLocaleDateString('fr-FR');
  categories = ['RH', 'TECHNIQUE', 'SÉCURITÉ', 'METIER'];
  isEditMode = false;
  articleIdToEdit!: number;
  article!: Article;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.articleForm = this.fb.group({
      titre: ['', Validators.required],
      description: [''],
      categorie: ['', Validators.required],
      fichiers: [null],
      tags: ['', Validators.required],
      source: [''],
      visibilite: ['public', Validators.required]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.articleIdToEdit = +params['id'];

        this.articleService.getArticleById(this.articleIdToEdit).subscribe((article: Article) => {
          this.article = article;
          this.articleForm.patchValue({
            titre: article.titre,
            description: article.contenu,
            categorie: article.categorie,
            tags: (article.tags || []).join(' '),
            source: article.source,
            visibilite: article.visibilite
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  get f() {
    return this.articleForm.controls;
  }

  toggleInputMode(mode: 'file' | 'text') {
    this.useTextEditor = mode === 'text';
    this.selectedFiles = [];
    this.articleForm.patchValue({ fichiers: null, description: '' });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.selectedFiles = Array.from(input.files);

    const file = this.selectedFiles[0]; // 👈 On prend le premier fichier
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result as string;
      this.articleForm.patchValue({ description: fileContent });
      console.log("✅ Contenu du fichier chargé :", fileContent);
    };

    reader.onerror = () => {
      console.error("❌ Erreur lors de la lecture du fichier");
    };

    reader.readAsText(file); // 👈 Compatible avec .txt, .md, .csv, .json simples
  }


  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  openPreview() {
    this.showPreviewModal = true;
  }

  closePreview() {
    this.showPreviewModal = false;
  }

  stripHtmlAndPreserveLineBreaks(html: string): string {
    return html
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n')
        .replace(/<\/div>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/\n{2,}/g, '\n');
  }

  exportAsPDF() {
    const doc = new jsPDF();
    const rawHtml = this.articleForm.value.description || '';
    const text = this.stripHtmlAndPreserveLineBreaks(rawHtml);

    let y = 10;
    doc.setFontSize(14);
    doc.text(`Titre : ${this.articleForm.value.titre}`, 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Date : ${this.today}`, 10, y); y += 8;
    doc.text(`Catégorie : ${this.articleForm.value.categorie}`, 10, y); y += 8;
    doc.text(`Tags : ${this.articleForm.value.tags}`, 10, y); y += 8;
    doc.text(`Visibilité : ${this.articleForm.value.visibilite}`, 10, y); y += 12;

    doc.setFont('helvetica', 'bold');
    doc.text('Contenu :', 10, y); y += 8;
    doc.setFont('helvetica', 'normal');

    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 10, y);

    const safeTitle = this.articleForm.value.titre?.trim().replace(/[^a-zA-Z0-9]/g, '_') || 'article';
    doc.save(`article_${safeTitle}.pdf`);
  }

  exportAsWord() {
    const rawHtml = this.articleForm.value.description || '';
    const text = this.stripHtmlAndPreserveLineBreaks(rawHtml);
    const safeTitle = this.articleForm.value.titre?.trim().replace(/[^a-zA-Z0-9]/g, '_') || 'article';

    const d = new docx.Document({
      sections: [{
        children: [
          new docx.Paragraph({ text: 'Titre : ' + this.articleForm.value.titre }),
          new docx.Paragraph({ text: 'Date : ' + this.today }),
          new docx.Paragraph({ text: 'Catégorie : ' + this.articleForm.value.categorie }),
          new docx.Paragraph({ text: 'Tags : ' + this.articleForm.value.tags }),
          new docx.Paragraph({ text: 'Visibilité : ' + this.articleForm.value.visibilite }),
          new docx.Paragraph({ text: 'Contenu :' }),
          ...text.split('\n').map(line => new docx.Paragraph({ text: line }))
        ]
      }]
    });

    docx.Packer.toBlob(d).then(blob => {
      saveAs(blob, `article_${safeTitle}.docx`);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.articleForm.invalid) return;

    const formValue = this.articleForm.value;
    const isDraft = formValue.visibilite === 'brouillon';

    const newArticle: Article = {
      articleId: 0, 
      titre: formValue.titre,
      contenu: formValue.description,
      themeId: 1,
      date: new Date().toISOString().split('T')[0],
      favori: false,
      status: isDraft ? 'BROUILLON' : 'EN_ATTENTE',
      modeSaisie: this.useTextEditor ? 'texte' : 'fichier',
      categorie: formValue.categorie,
      tags: formValue.tags.split(' '),
      source: formValue.source,
      visibilite: formValue.visibilite,
      isDraft: isDraft
    };

    // ✅ Ajout du log ici :
    console.log('Article envoyé au backend:', newArticle);

    this.articleService.addArticle(newArticle).subscribe({
      next: () => {
        this.articleForm.reset();
        this.submitted = false;
        this.selectedFiles = [];
        if (isDraft) {
          this.router.navigate(['/articles/brouillons']);
        } else {
          this.router.navigate(['/articles/mes-contributions']);
        }
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout :", err);
      }
    });
  }


}
