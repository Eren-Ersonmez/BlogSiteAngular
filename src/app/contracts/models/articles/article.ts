import { Category } from "../categories/category";
import { Comment } from "../comments/comment";

export class Article{
  public id:string;
  public title:string;
  public contentSummary:string;
  public content:string
  public categoryId:string;
  public picture?:string;
  public viewCount:number;
  public category:Category;
  public comments:Comment[];
  public createdDate:Date;
}
