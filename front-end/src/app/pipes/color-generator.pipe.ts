import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'colorGenerator'
})
export class ColorGeneratorPipe implements PipeTransform {

	constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, changePrice: string): unknown {

	let html: string;
	if (Number(changePrice) < 0) {
		html = `<span style="color:#ff0000;">${value} | ${changePrice}</span>`;
	} else {
		html =  `<span style="color:#7CFC00;">${value} | ${changePrice}</span>`;

	}

	return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
