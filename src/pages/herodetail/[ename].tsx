import React, { FC } from 'react';
import styles from './ename.less';
import { connect, HeroModelState, ConnectProps, Link } from 'umi';

interface PageProps extends ConnectProps {
  hero: HeroModelState;
}


const HeroDetail: FC<PageProps> = (props) => {
  let { heros = [] } = props.hero;
  try{
    let detail = heros.filter(item => item.ename === Number(props.match.params.ename));
    console.log(detail);
    console.log(props);
    return (
      <div>
        <h1>{detail[0].cname}</h1>
      </div>
    );

  }catch(e) {
    return null
  }

}

export default connect((hero) => hero)(HeroDetail);
