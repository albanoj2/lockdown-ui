import { Link } from '../../common/domain/link';

export class Account {
    public id: string;
    public name: string;
    public institution: string;
    public type: string;
    public subType: string;
    public links: Link[];
    public unbudgetedTransactionCount: number;

    public static fromJson(json: any): Account {

        let account = new Account();
        
        account.id = json.id;
        account.name = json.name;
        account.institution = json.institution;
        account.type = json.type;
        account.subType = json.subType;
        account.links = json._links;
        account.unbudgetedTransactionCount = json.unbudgetedTransactionCount;

        return account;
    }
}