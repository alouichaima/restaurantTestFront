import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item';
import { Category } from '../layouts/admin-layout/category/category';
import { Menu } from '../models/menu';
import { MenuData } from '../models/menu-data.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  readonly API_URL = 'http://localhost:7600/api/menu';
  constructor(private httpClient:HttpClient ) { }

  getMenu(){
    return this.httpClient.get(`${this.API_URL}/getMenu`)
  }

  getMenuWithCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.API_URL}/getMenu`);
  }


  getMenuData(): Observable<MenuData> {
    return this.httpClient.get<MenuData>(`${this.API_URL}/getMenuData`);
  }
//   addMenu(item: MenuItem, categoryId: number): Observable<Menu> {
//     const categorie = {};
//     return this.httpClient.post<Menu>(`${this.API_URL}/addMenu?categoryId=${categoryId}`, item);
//   }

//   deleteCategorieById( id: any){
//     return  this.httpClient.delete(`${this.API_URL}/delete-categorie/${id}`)
//   }

//   // Inside PubService
//   updateCategorie(id: any, categorieDetails: Category): Observable<any> {
//   return this.httpClient.put(`${this.API_URL}/update-categorie/${id}`, categorieDetails);
// }

// getCategories(): Observable<Category[]> {
//   return this.httpClient.get<Category[]>(this.API_URL);
// }

}
