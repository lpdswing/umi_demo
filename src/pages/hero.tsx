import React, { FC } from 'react';
import styles from './hero.less';
import { connect, HeroModelState, ConnectProps, Link } from 'umi';
import { Col, Row, Card, Radio } from 'antd';
import FreeHeroItem from '@/components/FreeHeroItem'

interface PageProps extends ConnectProps {
  hero: HeroModelState;
}

const RadioGroup = Radio.Group;

const heroType = [
  { key: 0, value: '全部' },
  { key: 1, value: '战士' },
  { key: 2, value: '法师' },
  { key: 3, value: '坦克' },
  { key: 4, value: '刺客' },
  { key: 5, value: '射手' },
  { key: 6, value: '辅助' },
];

const Hero: FC<PageProps> = (props) => {
  let { heros = [], filterKey = 0, freeheros = [], itemHover = 0 } = props.hero;
  heros = [...heros];
  console.log(props);
  const onChange = (e) => {
    console.log(e.target.value);
    props.dispatch({
      type: "hero/save",
      payload: {
        filterKey: e.target.value
      }
    });
  };

  const onItemHover = (index: number) => {
    props.dispatch!({
      type: "hero/save",
      payload: {
        itemHover: index
      },
    });
  }

  return (
    <div className={styles.normal}>
      <div className={styles.info}>
        <div className={styles.freehero}>
          <Row>
            <Col span={24}>
              <p>周免英雄</p>
              <div>
                {
                  freeheros.map((data, index) => (
                    <FreeHeroItem data={data}
                      itemHover={itemHover}
                      onItemHover={onItemHover}
                      thisIndex={index}
                      key={index}
                    />))
                }
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Card>
        <RadioGroup onChange={onChange} value={filterKey}>
          {
            heroType.map(data => (
              <Radio value={data.key} key={`hero-radio-${data.key}`}>
                {data.value}
              </Radio>
            ))
          }
        </RadioGroup>
      </Card>
      <Row>
        {heros.filter(item => (filterKey === 0 || item.hero_type === filterKey)).reverse().map((item) => (
          <Col key={item.ename} span={3} className={styles.heroitem}>
          <Link to={`/herodetail/${item.ename}`}>
            <img
              src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`}
              alt=""
            />
            <p>{item.cname}</p>
          </Link>
          </Col>
          
        ))}
      </Row>
    </div>
  );
};
// export default connect(({ hero }: { hero: HeroModelState }) => ({ hero }))(Hero);
export default connect((hero) => hero)(Hero);
