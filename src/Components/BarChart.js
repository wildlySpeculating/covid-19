import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { ResponsiveBar } from '@nivo/bar'

export default function BarChart(props) {
  const { className, data } = props

  return (
    <div className={cn('', className)}>
      <div className="c-bar_chart  u-show@tablet">
        <ResponsiveBar
          animate
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          colors={{ scheme: 'nivo' }}
          data={data}
          indexBy="date"
          keys={['cases', 'deaths']}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.5}
          axisBottom={
            data.length <= 30
              ? {
                  tickSize: 4,
                  tickPadding: 5,
                  tickRotation: 45,
                  legend: 'Date',
                  legendPosition: 'middle',
                  legendOffset: 42,
                }
              : null
          }
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Count',
            legendPosition: 'middle',
            legendOffset: -50,
          }}
          labelSkipWidth={20}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          motionStiffness={90}
          motionDamping={15}
          tooltip={(info) => <ToolTip info={info} />}
        />
      </div>
      <div className="c-bar_chart  u-hide@tablet">
        <ResponsiveBar
          animate
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          colors={{ scheme: 'nivo' }}
          data={data}
          indexBy="date"
          keys={['cases', 'deaths']}
          margin={{ top: 10, right: 10, bottom: 50, left: 60 }}
          padding={0.5}
          axisBottom={
            data.length <= 7
              ? {
                  tickSize: 4,
                  tickPadding: 5,
                  tickRotation: 45,
                  legendPosition: 'middle',
                  legendOffset: 42,
                }
              : null
          }
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Count',
            legendPosition: 'middle',
            legendOffset: -50,
          }}
          labelSkipWidth={20}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          motionStiffness={90}
          motionDamping={15}
          tooltip={(info) => <ToolTipMobile info={info} />}
        />
      </div>
    </div>
  )
}

BarChart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

BarChart.defaultProps = {
  className: '',
}

function ToolTip(props) {
  const {
    info: { id, indexValue, value },
  } = props

  return (
    <table className="u-margin-bot-none">
      <tbody>
        <tr>
          <td className="u-text-left">Date:</td>
          <td className="u-text-right">{indexValue}</td>
        </tr>
        <tr>
          <td className="u-text-left">{`${id[0].toUpperCase()}${id.slice(1)}`}:</td>
          <td className="u-text-right">{value}</td>
        </tr>
      </tbody>
    </table>
  )
}

function ToolTipMobile(props) {
  const {
    info: {
      data: { cases, date, deaths },
    },
  } = props

  return (
    <table className="u-margin-bot-none">
      <tbody>
        <tr>
          <td className="u-text-left">Date:</td>
          <td className="u-text-right">{date}</td>
        </tr>
        <tr>
          <td className="u-text-left">Cases:</td>
          <td className="u-text-right">{cases}</td>
        </tr>
        <tr>
          <td className="u-text-left">Deaths:</td>
          <td className="u-text-right">{deaths}</td>
        </tr>
      </tbody>
    </table>
  )
}
