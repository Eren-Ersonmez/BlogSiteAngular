import { Component, OnInit } from '@angular/core';
import { Archive } from '../../../../contracts/models/archive';
import { ArticleService } from '../../../../services/common/models/article.service';

@Component({
  selector: 'app-archive-menu',
  templateUrl: './archive-menu.component.html',
  styleUrl: './archive-menu.component.scss'
})
export class ArchiveMenuComponent implements OnInit{

  archives:Archive[];

  constructor(private articleService:ArticleService){}

  async ngOnInit(){
    this.archives=(await this.articleService.getArticlesArchive(()=>{},()=>{})).data
  }


}
