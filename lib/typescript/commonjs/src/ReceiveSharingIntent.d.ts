import type { IReceiveSharingIntent } from "./ReceiveSharingIntent.interfaces";
declare class ReceiveSharingIntentModule implements IReceiveSharingIntent {
    private isIos;
    private utils;
    private isClear;
    getReceivedFiles(handler: Function, errorHandler: Function, protocol?: string): void;
    clearReceivedFiles(): void;
    protected getFileNames(handler: Function, errorHandler: Function, url: string): void;
    getCheckboxStates(handler: Function, errorHandler: Function): void;
    clearcheckBox(): void;
}
export default ReceiveSharingIntentModule;
//# sourceMappingURL=ReceiveSharingIntent.d.ts.map