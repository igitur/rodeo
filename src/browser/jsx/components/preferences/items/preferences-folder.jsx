import _ from 'lodash';
import React from 'react';
import PreferencesItemErrors from '../preferences-item-errors.jsx';

/**
 * @class PreferencesFolder
 */
export default React.createClass({
  displayName: 'PreferencesFolder',
  propTypes: {
    className: React.PropTypes.string,
    item: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSelectFolder: React.PropTypes.func.isRequired
  },
  render: function () {
    const displayName = this.constructor.displayName,
      props = this.props,
      className = [_.kebabCase(displayName)],
      item = props.item;
    let label,
      content = [];

    if (item.label) {
      content.push(<label htmlFor={item.id}>{_.startCase(item.label)}</label>);
    }

    if (props.className) {
      className.push(props.className);
    }

    content.push(<div className="input-group">
      <input className="form-control" key="input" onChange={props.onChange} {...item} type="text"/>
      <span className="input-group-container">
        <button className="btn btn-default" onClick={props.onSelectFolder}>{'…'}</button>
      </span>
    </div>);

    if (item.fileStats) {
      const errors = item.fileStats.errors;

      if (errors && errors.length) {
        content.push(<PreferencesItemErrors errors={errors} key="errors" />);
      }
    }

    return <div className={className.join(' ')}>{content}</div>;
  }
});
