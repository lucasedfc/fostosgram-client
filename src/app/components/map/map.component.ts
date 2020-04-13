import { Component, OnInit, Input, ViewChild } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('map', { static: true }) map;

  constructor() { }

  ngOnInit() {
    const latlng = this.coords.split(',');
    const lat = Number(latlng[0]);
    const lng = Number(latlng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoibHVjYXNlZGZjIiwiYSI6ImNrOHQ1ZzhrZTAwbXkzaHQ2bmJqYXAzdzAifQ.T2fzdCNn1SlvfPTAWOAGAg';
    const map = new mapboxgl.Map({
      container: this.map.nativeElement ,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15
    });

    const marker = new mapboxgl.Marker()
    .setLngLat([ lng, lat])
    .addTo(map);

  }

}
