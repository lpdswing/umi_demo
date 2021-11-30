import React, { FC } from 'react';
import styles from './item.less';
import { connect, ItemModelState, ConnectProps } from 'umi';
import { Col, Row, Card, Radio } from 'antd';

interface PageProps extends ConnectProps {
  item: ItemModelState;
}

const RadioGroup = Radio.Group;


const itemType = [
  { key: 0, value: '全部' },
  { key: 1, value: '攻击' },
  { key: 2, value: '法术' },
  { key: 3, value: '防御' },
  { key: 4, value: '移动' },
  { key: 5, value: '打野' },
  { key: 7, value: '辅助' },
];

const Item: FC<PageProps> = (props) => {
  let { items = [], filterKey=0 } = props.item;

  const onChange = (e) => {
    console.log(e.target.value);
    props.dispatch({ 
      type: "item/save",
      payload: {
        filterKey: e.target.value
      }
    })
  };

  return (
    <div>
      <RadioGroup value={filterKey} onChange={onChange}>
        {
          itemType.map(item => (
            <Radio value={item.key} key={`item-radio-${item.key}`}>
              {item.value}
            </Radio>
          ))
        }
      </RadioGroup>
      <Row>
        {items.filter(item =>(filterKey===0 || item.item_type===filterKey)).map((item) => (
          <Col key={item.item_id} span={3} className={styles.item}>
            <img
              src={`https://game.gtimg.cn/images/yxzj/img201606/itemimg/${item.item_id}.jpg`}
            />
            <p>{item.item_name}</p>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default connect((item) => item)(Item);
