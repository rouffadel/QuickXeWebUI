import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genericSearchFilter',
  standalone: true
})
export class GenericSearchFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, searchProperties: string[] = []): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return searchProperties.some(property =>
        item[property].toString().toLowerCase().includes(searchText)
      );
    });
  }

}
