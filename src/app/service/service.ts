import { Observable, Subject, from } from "rxjs";

export abstract class Service<T> {

    private createSubject: Subject<T> = new Subject();
    private updateSubject: Subject<T> = new Subject();
    private deleteSubject: Subject<T> = new Subject();

    protected abstract findAll(): Observable<T[]>;
    protected abstract findById(id: string): Observable<T>;
    protected abstract createElement(element: T): Observable<T>;
    protected abstract updateElement(element: T): Observable<T>;
    protected abstract deleteElement(element: T): Observable<any>;

    public create(element: T): Observable<T> {
        let observable = this.createElement(element);
        observable.subscribe(createdElement => this.createSubject.next(createdElement));
        return observable;
    }

    public update(element: T): Observable<T> {
        let observable = this.updateElement(element);
        observable.subscribe(updatedElement => this.updateSubject.next(updatedElement));
        return observable;
    }

    public delete(element: T): Observable<T> {
        let observable = this.deleteElement(element);
        observable.subscribe(deletedElement => this.deleteSubject.next(element));
        
        return from(observable
            .toPromise()
            .then(_ => element)
        );
    }

    public whenCreated(): Observable<T> {
        return this.createSubject;
    }

    public whenUpdated(): Observable<T> {
        return this.updateSubject;
    }

    public whenDeleted(): Observable<T> {
        return this.deleteSubject;
    }
}