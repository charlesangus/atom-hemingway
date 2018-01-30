'use babel';

import AtomHemingway from '../lib/atom-hemingway';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AtomHemingway', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    activationPromise = atom.packages.activatePackage('atom-hemingway');
  });

  describe('when the atom-hemingway:toggle event is triggered', () => {
    it('moves the cursor to the bottom', () => {

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'atom-hemingway:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.atom-hemingway')).toExist();

        let atomHemingwayElement = workspaceElement.querySelector('.atom-hemingway');
        expect(atomHemingwayElement).toExist();

      });
    });

    });
});
