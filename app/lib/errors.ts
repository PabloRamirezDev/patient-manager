export class ActionError extends Error {
  clientMessage: string;

  constructor(clientMessage: string, message?: string) {
    super(message);
    this.clientMessage = clientMessage;
  }
}
