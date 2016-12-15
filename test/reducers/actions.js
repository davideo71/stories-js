/*
 * Let's use expect (easier on the eyes than assert and no downsides like should).
 * - setup/teardown in mocha?
 * - http://redux.js.org/docs/recipes/WritingTests.html#async-action-creators
 * - just a thought: how about tape+sinon?
 */
const { expect } = require('chai');
const actions = require('../../src/reducers/actions.js');

describe('actions', () => {

  // --> https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha
  // (https://gist.github.com/kolodny/50e7384188bb5dc41ebb)

  // ----> use diffs instead of plain 'existence' checks in order to detect incorrect deletions/changes as well?

  // TODO: check if actions attach correct data in correct place
  // TOOD: check if createNode correctly increments nextId counter
  // more?
});
