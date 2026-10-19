const React = require('react');
const { View } = require('react-native');

// Proxy mock so any Lucide icon renders a plain View in tests
const MockIcon = (props) => React.createElement(View, props);

module.exports = new Proxy(
  {},
  {
    get: (_, name) => {
      if (name === '__esModule') return true;
      if (name === 'default') return MockIcon;
      return MockIcon;
    },
  }
);
