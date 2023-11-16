import {computed, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingSignal = signal(false);

  isLoading = computed(() =>this.loadingSignal())

  setLoadingTrue(): void {
    this.loadingSignal.update(() => true)
  }
  setLoadingFalse(): void {
    this.loadingSignal.update(() => false)
  }
}
