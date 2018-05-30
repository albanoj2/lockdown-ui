import { Link } from '../service/link';

export class Account {
    public id: string;
    public name: string;
    public type: string;
    public subType: string;
    public links: Link[];
}