import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default function TrendingChart(props) {
  const { className, dataArray, title } = props

  return (
    <div className={cn('', className)}>
      <h5 className="u-margin-bot-small">{title}</h5>
      <ol className="u-margin-bot-none">
        {dataArray.map(({ fips, name, low, high, percentIncrease }) => (
          <li className="" key={fips}>
            {name} {`${percentIncrease}%`}
          </li>
        ))}
      </ol>
    </div>
  )
}

TrendingChart.propTypes = {
  className: PropTypes.string,
  dataArray: PropTypes.arrayOf(
    PropTypes.shape({
      fips: PropTypes.string.isRequired,
      high: PropTypes.number.isRequired,
      low: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      percentIncrease: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
}

TrendingChart.defaultProps = {
  className: '',
}
