import { FC, useMemo } from 'react';
import { Divider, Select, Slider } from 'antd';
import './SliderFilter.scss';

interface SliderFilterProps {
  filterMethod: string;
  setFilterMethod: React.Dispatch<React.SetStateAction<string>>;
  setLossValue: React.Dispatch<React.SetStateAction<number | [number, number]>>;
}

const SliderFilter: FC<SliderFilterProps> = ({
  filterMethod,
  setFilterMethod,
  setLossValue,
}) => {
  const formatter = (value?: number): string => `${value ?? 0}%`;
  const isRange = filterMethod === 'between' || filterMethod === 'not-between';

  const sharedProps = useMemo(
    () => ({
      reversed: filterMethod === 'before',
      onAfterChange: setLossValue,
      tipFormatter: formatter,
    }),
    [filterMethod, setLossValue]
  );

  const slider = useMemo(
    () =>
      isRange ? (
        <Slider range defaultValue={[10, 90]} {...sharedProps} />
      ) : (
        <Slider defaultValue={0} {...sharedProps} />
      ),
    [isRange, sharedProps]
  );

  return (
    <div className="slider-filter">
      <div className="slider-filter__filter-method">
        <p>Filter method:</p>
        <Select defaultValue="after" onChange={setFilterMethod}>
          <Select.Option value="after">After</Select.Option>
          <Select.Option value="before">Before</Select.Option>
          <Select.Option value="between">Between</Select.Option>
          <Select.Option value="not-between">Not Between</Select.Option>
        </Select>
      </div>
      <Divider style={{ marginTop: '0.5rem', marginBottom: '0.25rem' }} />
      <div className="slider-filter__filter-slider">{slider}</div>
    </div>
  );
};

export default SliderFilter;
