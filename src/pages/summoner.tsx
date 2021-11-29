import React, { FC } from 'react';
import styles from './summoner.less';
import { connect, SummonerModelState, ConnectProps } from 'umi';
import { Col, Row } from 'antd';

interface PageProps extends ConnectProps {
  summoner: SummonerModelState;
}

const Summoner: FC<PageProps> = (props) => {
  let { summoners = [] } = props.summoner;
  return (
    <div>
      <Row>
        {summoners.map((summoner) => (
          <Col
            key={summoner.summoner_id}
            span={3}
            className={styles.summoneritem}
          >
            <img
              src={`https://game.gtimg.cn/images/yxzj/img201606/summoner/${summoner.summoner_id}.jpg`}
              alt=""
            />
            <p>{summoner.summoner_name}</p>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default connect((summoner) => summoner)(Summoner);

//game.gtimg.cn/images/yxzj/img201606/summoner/80104.jpg
