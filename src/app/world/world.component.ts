import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrl: './world.component.css'
})
export class WorldComponent implements OnInit{
  ngOnInit(): void {
    let svgPaths = document.querySelectorAll<SVGPathElement>('path');
    svgPaths.forEach(svgCountry => {

      svgCountry.addEventListener('mouseover', event => {
        const path = event.target as SVGPathElement;
        if (path) {
          path.style.fill = 'red'; // Sets mouse hovered color to red
        }
      });
    
      svgCountry.addEventListener('mouseleave', event => {
        const path = event.target as SVGPathElement;
        if (path) {
          path.style.fill = '';
        }
      });
      // This is the function for clicking a highlighted country
      svgCountry.addEventListener('click', () => {
        this.getCountryData(svgCountry);
      });
    });
  }
  // Gathers associated data from API and sets to corresponding HTML element. Per Rubric task F, second bullet point
  async getCountryData(svgCountry: SVGPathElement){
    let api: string = 'https://api.worldbank.org/V2/country/'+svgCountry.id+'?format=json';
    let res: Response = await fetch(api);
    let data: any =  await res.json();
    let dataPath: any = data[1];
    console.log(dataPath[0]);
    
    let name: string = dataPath[0].name;
    document.getElementById('name')!.innerText = name;

    let capital: string = dataPath[0].capitalCity;
    document.getElementById('capital')!.innerText = capital;

    let region: string = dataPath[0].region.value;
    document.getElementById('region')!.innerText = region;

    let income: string = dataPath[0].incomeLevel.value;
    document.getElementById('income')!.innerText = income;

    let latitude: string = dataPath[0].latitude;
    document.getElementById('latitude')!.innerText = latitude;

    let longitude: string = dataPath[0].longitude;
    document.getElementById('longitude')!.innerText = longitude;
  }
  
} {

}
