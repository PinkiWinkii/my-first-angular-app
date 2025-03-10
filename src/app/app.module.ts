import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { counterReducer } from './store/counter.reducer';
import { CounterEffects } from './store/counter.effects';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';  // Solo importamos AppComponent

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    StoreModule.forRoot({ counter: counterReducer }),  // Registra el reducer
    EffectsModule.forRoot([CounterEffects]),
    CommonModule,
    AppComponent  // Solo importamos, no declaramos
  ],
  bootstrap: [],  // Inicia la aplicación con AppComponent
})
export class AppModule {}
