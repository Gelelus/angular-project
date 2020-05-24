import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effect';
import { environment } from 'src/environments/environment';
import { RecipeEffects } from './recipes/store/recipe.effect';
import { ShopingListEffects } from './shoping-list/store/shoping-list.effects';
import { ProfileEffects } from './profile/store/profile.effects';
import { UsersEffects } from './users/store/users.effects';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([
      AuthEffects,
      RecipeEffects,
      ShopingListEffects,
      ProfileEffects,
      UsersEffects,
    ]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    // StoreRouterConnectingModule.forRoot(), // авто отправка экшенов при навигации
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
