import { FC, useMemo, useState } from 'react';
import { SpinProps, Table } from 'antd';
import { LoadingOutlined, SlidersOutlined } from '@ant-design/icons';
import SliderFilter from 'components/SliderFilter';
import Page from 'containers/Page';
import { downtimeInSeconds } from 'helpers';
import useOuttages from 'hooks/useOuttages';
import { ApiRequestConfigParams } from 'types/apiRequest';
import { ApiResponseData, OuttageResponseData } from 'types/apiResponse';

const Outtage: FC = () => {
  const [filterMethod, setFilterMethod] = useState<string>('after');
  const [lossValue, setLossValue] = useState<number | [number, number]>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = useState<number>(10);
  // const [maintenance, setMaintenance] = useState<boolean | undefined>();
  const onChange = (page: number, pageSize: number): void => {
    setCurrentPage(page);
    setCurrentPageSize(pageSize);
  };

  const outtageParams = useMemo((): ApiRequestConfigParams => {
    const p: ApiRequestConfigParams = {
      page: {
        offset: currentPage - 1,
        size: currentPageSize,
      },
    };

    if (typeof lossValue === 'number' && lossValue !== 0) {
      if (p.filter === undefined) {
        p.filter = {};
      }
      p.filter.loss = lossValue;
    }

    // if (maintenance !== undefined) {
    //   if (p.filter === undefined) { p.filter = {}; };
    //   p.filter.maintenance = maintenance;
    // }

    return p;
  }, [currentPage, currentPageSize, lossValue]);

  const { data, loading, meta } = useOuttages({ params: outtageParams });
  const outtageData = data as OuttageResponseData[];

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a: OuttageResponseData, b: OuttageResponseData) =>
        parseInt(a.id, 10) - parseInt(b.id, 10),
    },
    {
      title: 'Downtime',
      dataIndex: ['attributes', 'downtime'],
      sorter: (a: OuttageResponseData, b: OuttageResponseData) =>
        downtimeInSeconds(a.attributes.downtime) -
        downtimeInSeconds(b.attributes.downtime),
    },
    {
      title: 'Maintenance',
      dataIndex: ['attributes', 'maintenance'],
      render: (maintenanceField: boolean) => (maintenanceField ? 'Yes' : 'No'),
      filters: [
        {
          text: 'Yes',
          value: true,
        },
        {
          text: 'No',
          value: false,
        },
      ],
      filterMultiple: false,
    },
    {
      title: 'Loss %',
      dataIndex: ['attributes', 'loss'],
      render: (loss: number) => `${loss}%`,
      filterIcon: <SlidersOutlined />,
      filterDropdown: (
        <SliderFilter
          filterMethod={filterMethod}
          setFilterMethod={setFilterMethod}
          setLossValue={setLossValue}
        />
      ),
      sorter: (a: OuttageResponseData, b: OuttageResponseData) =>
        a.attributes.loss - b.attributes.loss,
    },
    {
      title: 'Created At',
      dataIndex: ['attributes', 'createdAt'],
      render: (createdAt: string) =>
        new Intl.DateTimeFormat().format(new Date(createdAt)),
    },
  ];

  const spinProps: SpinProps = {
    indicator: <LoadingOutlined style={{ fontSize: 48 }} spin />,
  };

  return (
    <Page title="Outtages">
      <Table
        columns={columns}
        dataSource={outtageData}
        loading={loading !== true ? false : spinProps}
        pagination={{
          defaultPageSize: currentPageSize,
          onChange,
          showSizeChanger: true,
          total: meta.totalCount,
          responsive: false,
        }}
        rowKey={(record: ApiResponseData): string => `row-${record.id}`}
        scroll={{ x: true }}
        style={{ width: '100%' }}
      />
    </Page>
  );
};

export default Outtage;
