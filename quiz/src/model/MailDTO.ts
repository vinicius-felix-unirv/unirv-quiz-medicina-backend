
export interface IMailDTO{

    to: string,
    subject: string,
    text: string
}

const template = `
        <h1 style="Color: blue" >Hola homem das cavernas </h1>`;

export class MailDTO{

    private to: string;
    private subject: string;
    private html: string;
    private text:string;

    constructor(data: IMailDTO){

        this.to = data.to;
        this.subject = data.subject;
        this.html = template;
        this.text = data.text;
    }

    getTO(): string { return this.to; }

    getSubject(): string { return this.subject; }

    getHtml(): string { return this.html; }
    
    getText(): string { return this.text; }

}