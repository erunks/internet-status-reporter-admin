import { FC } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Page from 'containers/Page';
import useOuttages from 'hooks/useOuttages';

const Outtage: FC = () => {
  const { loading } = useOuttages({});

  return (
    <Page title="Outtages">
      {loading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      ) : (
        'Outtages'
      )}
    </Page>
  );
};

export default Outtage;
