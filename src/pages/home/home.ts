import { GorgHueProvider } from './../../providers/gorg-hue/gorg-hue';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  protected Lights: object[];
  protected currentLight: object;
  protected searchLight: string = "";

  constructor(public navCtrl: NavController, private hueService: GorgHueProvider) {
    this.getLights();  
  }

  getLights(){
    this.Lights = [];

    this.hueService.getLights().subscribe((lights) => {      
      Object.keys(lights).forEach((light) => {
        this.Lights.push({key: light, value : lights[light], colorloop: false});  
      });
      
      console.info('this.Lights', this.Lights);
    });
  }

  getLight(lightParam: any) {
    this.hueService.getLight(lightParam.key).subscribe((light) => {
      this.currentLight = { id: lightParam.key, ...light };
    });
  }

  switchOnOff(light: any) {
    console.info('switchOnOff', light);
    const newState = {
      // 'hue': 50000,
      'on': light.value.state.on,
      // 'bri': 200,
      // 'alert' : 'lselect'
    };
    if (!light.value.state.on) {
      light.value.state.effect = 'none';
    }

    this.hueService.setLightState(light.key, newState).subscribe((resp) => {
      console.info('resp', resp);
    });
  }

  colorCycle(light: any) {
    console.info('colorCycle', light);
    light.value.state.effect = (!light.colorloop ? 'none' : 'colorloop');
    if (!light.value.state.on) {
      light.value.state.on = true;
    }

    this.hueService.setLightState(light.key, {
      'effect': light.value.state.effect,
    }).subscribe((resp) => {
      console.info('resp', resp);
    });
  }

  changeBri(light: any) {
    console.info('changeBri', light);

    if (!light.value.state.on) {
      light.value.state.on = true;
    }

    this.hueService.setLightState(light.key, {
      'bri': light.value.state.bri,
    }).subscribe((resp) => {
      console.info('resp', resp);
    });
  }

  filterLight(ev: any){
    if(this.searchLight && this.searchLight.length > 0){
      this.Lights = this.Lights.filter((light) => {
        return light["value"].name.toLowerCase().includes(this.searchLight.toLowerCase());
      });
    }
    else {
      this.getLights();
    }    
  }
}
