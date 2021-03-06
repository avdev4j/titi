import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Conference } from 'app/shared/model/conference.model';
import { ConferenceService } from './conference.service';
import { ConferenceComponent } from './conference.component';
import { ConferenceDetailComponent } from './conference-detail.component';
import { ConferenceUpdateComponent } from './conference-update.component';
import { ConferenceDeletePopupComponent } from './conference-delete-dialog.component';
import { IConference } from 'app/shared/model/conference.model';

@Injectable({ providedIn: 'root' })
export class ConferenceResolve implements Resolve<IConference> {
  constructor(private service: ConferenceService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConference> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((conference: HttpResponse<Conference>) => conference.body));
    }
    return of(new Conference());
  }
}

export const conferenceRoute: Routes = [
  {
    path: '',
    component: ConferenceComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'msIgniteApp.conference.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ConferenceDetailComponent,
    resolve: {
      conference: ConferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'msIgniteApp.conference.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ConferenceUpdateComponent,
    resolve: {
      conference: ConferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'msIgniteApp.conference.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ConferenceUpdateComponent,
    resolve: {
      conference: ConferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'msIgniteApp.conference.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const conferencePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ConferenceDeletePopupComponent,
    resolve: {
      conference: ConferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'msIgniteApp.conference.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
