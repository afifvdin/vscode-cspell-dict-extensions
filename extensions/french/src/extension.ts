'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as dict from 'cspell-dict-fr-fr';

interface CodeSpellCheckerExtension {
    registerConfig(path: string): Promise<void>;
    enableLocal(isGlobal: boolean, local: string): Promise<void>;
    disableLocal(isGlobal: boolean, local: string): Promise<void>;
}


const local = 'fr';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    const vscodeSpellCheckerExtension = 'streetsidesoftware.code-spell-checker';

    const extension = vscode.extensions.getExtension<CodeSpellCheckerExtension>(vscodeSpellCheckerExtension);

    if (extension) {
        extension.activate().then(ext => {
            const path = dict.getConfigLocation();
            // We need to register the dictionary configuration with the Code Spell Checker Extension
            ext && ext.registerConfig && ext.registerConfig(path);
        });
    }

    
    function enableFrench(isGlobal: boolean) {
        extension && extension.activate().then(ext => {
            ext && ext.enableLocal && ext.enableLocal(isGlobal, local);
        });
    }

    function disableFrench(isGlobal: boolean) {
        extension && extension.activate().then(ext => {
            ext && ext.disableLocal && ext.disableLocal(isGlobal, local);
        });
    }

    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(
        vscode.commands.registerCommand('cSpellExt_french.enableFrench', () => enableFrench(true)),
        vscode.commands.registerCommand('cSpellExt_french.disableFrench', () => disableFrench(true)),
        vscode.commands.registerCommand('cSpellExt_french.enableFrenchWorkspace', () => enableFrench(false)),
        vscode.commands.registerCommand('cSpellExt_french.disableFrenchWorkspace', () => disableFrench(false)),
    );
    
}

// this method is called when your extension is deactivated
export function deactivate() {
}