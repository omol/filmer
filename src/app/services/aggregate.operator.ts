import { Observable, Subscriber } from 'rxjs';

// Type T => KeyboardEvent here

export function aggregate<T>(allowedTimeForNextEventInMs: number, limit?: number): (source: Observable<T>) => Observable<T[]> {

  let aggregatedEventValues: T[] = [];
  let timerRef = null;
  const maxKeypressCount = limit || 5;

  const handleTimeout = (subscriber: Subscriber<T[]>): () => void => {
    return (): void => {
      const keyEventsCopy = aggregatedEventValues.slice(0);
      aggregatedEventValues = [];
      subscriber.next(keyEventsCopy);
    };
  };

  return (source: Observable<T>): Observable<T[]> => {
    return new Observable( (subscriber: Subscriber<T[]>) => {
      source.subscribe({
        next(value): void {
          if (value !== undefined && value !== null) {
            aggregatedEventValues.push(value);
            if (timerRef) {
              clearTimeout(timerRef);
            }
            if (aggregatedEventValues.length < maxKeypressCount) {
              timerRef = setTimeout(handleTimeout(subscriber), allowedTimeForNextEventInMs);
            } else {
              handleTimeout(subscriber)();
            }
          }
        },
        error(error): void {
          subscriber.error(error);
        },
        complete(): void {
          subscriber.complete();
        }
      });
    });
  };
}
