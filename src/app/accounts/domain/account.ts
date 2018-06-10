import { Link } from '../../common/domain/link';

export class Account {
    public id: string;
    public name: string;
    public institution: string;
    public type: string;
    public subType: string;
    public links: Link[];
}