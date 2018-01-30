'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,
  active: null,
  editorSubscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this package
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-hemingway:toggle': () => this.toggle()
    }));

    this.active = false;

  },

  disallowCursorMove(changeEvent) {
      if (changeEvent.oldBufferPosition.isEqual(changeEvent.newBufferPosition)) {
        return;
      } else {
        changeEvent.cursor.moveToBottom();
    }
  },

  disallowSelection(changeEvent) {
    if (!changeEvent.selection) {
      return;
    }
    if (changeEvent.selection.isEmpty()) {
      return;
    } else {
      changeEvent.selection.clear();
    }
  },

  disallowInternalTextInsert(changeEvent) {
    editor = atom.workspace.getActiveTextEditor();
    editor.moveToBottom();
  },

  registerDisallows(editor) {
    this.editorSubscriptions.add(
      editor.onDidChangeCursorPosition(this.disallowCursorMove)
    );
    this.editorSubscriptions.add(
      editor.onDidChangeCursorPosition(this.disallowSelection)
    );
    this.editorSubscriptions.add(
      editor.onWillInsertText(this.disallowInternalTextInsert)
    );
  },

  toggle() {

    if (this.active == true) {
      this.active = false;
      this.editorSubscriptions.dispose();
      console.log('AtomHemingway is now off.');
    } else {
      this.active = true;
      editor = atom.workspace.getActiveTextEditor();
      editor.moveToBottom();
      this.editorSubscriptions = new CompositeDisposable();
      this.editorSubscriptions.add(
        atom.workspace.observeTextEditors(
          this.registerDisallows.bind(this)
        )
      );
      console.log('AtomHemingway is now on.');
    }
  },

  deactivate() {
    active = false;
    this.subscriptions.dispose();
    this.editorSubscriptions.dispose();
  }
};
