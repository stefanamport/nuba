export class FormValidation {
  public valid = false;
  public messages =  [];

  public clearFormValidation() {
    this.valid = true;
    this.messages = [];
  }
}
