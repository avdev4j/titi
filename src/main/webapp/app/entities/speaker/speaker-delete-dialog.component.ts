import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISpeaker } from 'app/shared/model/speaker.model';
import { SpeakerService } from './speaker.service';

@Component({
  selector: 'jhi-speaker-delete-dialog',
  templateUrl: './speaker-delete-dialog.component.html'
})
export class SpeakerDeleteDialogComponent {
  speaker: ISpeaker;

  constructor(protected speakerService: SpeakerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.speakerService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'speakerListModification',
        content: 'Deleted an speaker'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-speaker-delete-popup',
  template: ''
})
export class SpeakerDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ speaker }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SpeakerDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.speaker = speaker;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/speaker', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/speaker', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
