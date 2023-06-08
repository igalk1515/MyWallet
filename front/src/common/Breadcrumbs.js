import React from 'react';

export class Breadcrumbs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pathNames } = this.props;
    return (
      <div className="breadcrumbs">
        {pathNames.map((breadcrumb, index) => (
          <span key={index}>
            <a href={breadcrumb}>{breadcrumb}</a>
            {index < pathNames.length - 1 && ' > '}
          </span>
        ))}
      </div>
    );
  }
}
