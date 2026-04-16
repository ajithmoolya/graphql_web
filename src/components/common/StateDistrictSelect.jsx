import React from 'react'
import { useGetStatesQuery } from '../../../services/graphql/__generated__/operations'
import { useDistricts } from '../../hooks'

export default function StateDistrictSelect({
  stateValue,
  onStateChange,
  districtValue,
  onDistrictChange,
  stateLabel = 'State',
  districtLabel = 'District',
  disabled = false,
}) {
  const { data: statesData, loading: statesLoading } = useGetStatesQuery()

  const { districts, loading: districtsLoading } = useDistricts(stateValue)

  function handleStateChange(e) {
    const code = e.target.value || ''
    onStateChange && onStateChange(code)
    // reset district when state changes
    onDistrictChange && onDistrictChange('')
  }

  return (
    <div className="flex space-x-2">
      <div className="flex-1">
        <label className="label">{stateLabel} <span className="text-red-500">*</span></label>
        <select
          className="input"
          value={stateValue || ''}
          onChange={handleStateChange}
          disabled={disabled || statesLoading}
        >
          <option value="">Select {stateLabel}</option>
          {statesData?.getStates?.map(s => (
            <option key={s.state_code} value={s.state_code}>
              {s.state_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="label">{districtLabel} <span className="text-red-500">*</span></label>
        <select
          className="input"
          value={districtValue || ''}
          onChange={e => onDistrictChange && onDistrictChange(e.target.value)}
          disabled={disabled || !stateValue || districtsLoading}
        >
          <option value="">Select {districtLabel}</option>
          {districts.map(d => (
            <option key={d.district_code} value={d.district_code}>
              {d.district_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
