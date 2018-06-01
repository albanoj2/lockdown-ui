import { Link } from "../service/link";

export class Budget {

    constructor(public name: string) {}

    public links: Link[];
    public id: string;
}