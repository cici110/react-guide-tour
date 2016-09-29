import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import HelloWorld from '../../app/components/HelloWorld';

describe('root', function () {
  it('renders without problems', function () {
    var root = TestUtils.renderIntoDocument(<HelloWorld/>);
    expect(root).toExist();
  });
});
